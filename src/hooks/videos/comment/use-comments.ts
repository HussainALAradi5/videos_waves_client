'use client'

import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { Comment } from '@/interfaces/videos/comment/comment.interface'
import { commentService } from '@/services/videos/comment/comment.service'
import { usePagedList } from '@/hooks/common/use-paged-list'

export const useComments = (videoId: string) =>
  usePagedList<Comment>({
    queryKey: QUERY_KEYS.comments(videoId),
    fetchPage: (page, signal) => commentService.list(videoId, { page, pageSize: PAGE_SIZES.COMMENTS }, signal)
  })

/** Oldest first, so a thread reads top to bottom; loaded only when opened. */
export const useReplies = (videoId: string, commentId: string, isOpen: boolean) =>
  usePagedList<Comment>({
    queryKey: QUERY_KEYS.replies(videoId, commentId),
    fetchPage: (page, signal) =>
      commentService.listReplies(videoId, commentId, { page, pageSize: PAGE_SIZES.COMMENTS, sortDirection: 'asc' as never }, signal),
    isEnabled: isOpen
  })
