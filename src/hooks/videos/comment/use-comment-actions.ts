'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MESSAGES } from '@/constants/common/messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { commentService } from '@/services/videos/comment/comment.service'
import { patchVideoInCache } from '@/utilities/cache/video-cache.utility'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Create, edit, and delete; each refreshes the comment pages and keeps the video's count in sync. */
export const useCommentActions = (videoId: string) => {
  const queryClient = useQueryClient()
  const refreshComments = () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(videoId) })
  const shiftCount = (delta: number) =>
    patchVideoInCache(queryClient, videoId, (video) => ({ commentsCount: Math.max(0, video.commentsCount + delta) }))

  const create = useMutation({
    mutationFn: (content: string) => commentService.create(videoId, { content }),
    onSuccess: async () => {
      shiftCount(1)
      notifySuccess(MESSAGES.COMMENTS.ADDED)
      await refreshComments()
    },
    onError: notifyError
  })

  const update = useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      commentService.update(videoId, commentId, { content }),
    onSuccess: async () => {
      notifySuccess(MESSAGES.COMMENTS.UPDATED)
      await refreshComments()
    },
    onError: notifyError
  })

  const remove = useMutation({
    mutationFn: (commentId: string) => commentService.remove(videoId, commentId),
    onSuccess: async () => {
      shiftCount(-1)
      notifySuccess(MESSAGES.COMMENTS.DELETED)
      await refreshComments()
    },
    onError: notifyError
  })

  return { create, update, remove }
}
