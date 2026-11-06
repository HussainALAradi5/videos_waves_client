'use client'

import { useState } from 'react'
import { Role } from '@/enums/users/roles/role.enum'
import type { Comment } from '@/interfaces/videos/comment/comment.interface'
import { useAuth } from '../../users/auth/use-auth'
import { useCommentActions } from './use-comment-actions'

/** Per-comment state mirroring the API rules: authors edit; authors, the video owner, and admins delete. */
export const useCommentItem = (comment: Comment, videoOwnerId: string) => {
  const { user } = useAuth()
  const actions = useCommentActions(comment.videoId)
  const [isEditing, setIsEditing] = useState(false)
  const [areRepliesOpen, setAreRepliesOpen] = useState(false)
  const isAuthor = user?.id === comment.author.id
  const isVideoOwner = user?.id === videoOwnerId

  return {
    canEdit: isAuthor,
    canDelete: isAuthor || isVideoOwner || user?.role === Role.ADMIN,
    canApprove: isVideoOwner && comment.isPendingApproval,
    isEditing,
    startEdit: () => setIsEditing(true),
    cancelEdit: () => setIsEditing(false),
    saveEdit: async (content: string) => {
      await actions.update.mutateAsync({ commentId: comment.id, content })
      setIsEditing(false)
    },
    remove: () => actions.remove.mutateAsync(comment.id),
    approve: () => actions.approve.mutateAsync(comment.id),
    areRepliesOpen,
    toggleReplies: () => setAreRepliesOpen((open) => !open)
  }
}
