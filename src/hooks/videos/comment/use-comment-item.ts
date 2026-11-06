'use client'

import { useState } from 'react'
import { Role } from '@/enums/users/roles/role.enum'
import type { Comment } from '@/interfaces/videos/comment/comment.interface'
import { isValidCommentContent } from '@/validations/videos/comment/comment-form.validation'
import { useAuth } from '../../users/auth/use-auth'
import { useCommentActions } from './use-comment-actions'

/** Edit and delete state for one comment, mirroring the API rules: author edits, author or admin deletes. */
export const useCommentItem = (comment: Comment) => {
  const { user } = useAuth()
  const { update, remove } = useCommentActions(comment.videoId)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(comment.content)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const isAuthor = user?.id === comment.author.id
  const canDelete = isAuthor || user?.role === Role.ADMIN

  const startEdit = () => {
    setDraft(comment.content)
    setIsEditing(true)
  }

  const saveEdit = async () => {
    if (!isValidCommentContent(draft)) return
    await update.mutateAsync({ commentId: comment.id, content: draft.trim() })
    setIsEditing(false)
  }

  const confirmDelete = () => remove.mutate(comment.id, { onSuccess: () => setIsDeleteOpen(false) })

  return {
    canEdit: isAuthor,
    canDelete,
    isEditing,
    draft,
    setDraft,
    startEdit,
    cancelEdit: () => setIsEditing(false),
    saveEdit: () => void saveEdit().catch(() => undefined),
    isSaving: update.isPending,
    isDeleteOpen,
    openDelete: () => setIsDeleteOpen(true),
    closeDelete: () => setIsDeleteOpen(false),
    confirmDelete,
    isDeleting: remove.isPending
  }
}
