'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MESSAGES } from '@/constants/common/messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { COMMENT_MESSAGES } from '@/constants/videos/comment/comment-messages.constants'
import type { CreateCommentRequestDto } from '@/dtos/videos/comment/create-comment-request.dto'
import { commentService } from '@/services/videos/comment/comment.service'
import { notifyError, notifySuccess, notifyUndo } from '@/utilities/toast/notify.utility'

/**
 * Create, edit, delete with Undo, and approve. Each refreshes the comment threads and the video,
 * so counts always match the server (restricted comments do not count until approved).
 */
export const useCommentActions = (videoId: string) => {
  const queryClient = useQueryClient()
  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(videoId) })
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.video(videoId) })
  }

  const create = useMutation({ mutationFn: (dto: CreateCommentRequestDto) => commentService.create(videoId, dto), onSuccess: refresh, onError: notifyError })
  const update = useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) => commentService.update(videoId, commentId, { content }),
    onSuccess: async () => {
      notifySuccess(MESSAGES.COMMENTS.UPDATED)
      await refresh()
    },
    onError: notifyError
  })
  const restore = useMutation({ mutationFn: (commentId: string) => commentService.restore(videoId, commentId), onSuccess: refresh, onError: notifyError })
  const remove = useMutation({
    mutationFn: (commentId: string) => commentService.remove(videoId, commentId),
    onSuccess: async (_result, commentId) => {
      notifyUndo(COMMENT_MESSAGES.DELETED_UNDO, () => restore.mutate(commentId))
      await refresh()
    },
    onError: notifyError
  })
  const approve = useMutation({
    mutationFn: (commentId: string) => commentService.approve(videoId, commentId),
    onSuccess: async () => {
      notifySuccess(COMMENT_MESSAGES.APPROVED)
      await refresh()
    },
    onError: notifyError
  })
  return { create, update, remove, approve }
}
