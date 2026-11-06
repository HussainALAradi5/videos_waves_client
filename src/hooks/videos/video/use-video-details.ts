'use client'

import { Role } from '@/enums/users/roles/role.enum'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { isNotFoundError } from '@/utilities/errors/api-error.utility'
import { useAuth } from '../../users/auth/use-auth'
import { useRecordView } from './use-record-view'
import { useVideo } from './use-video'
import { useVideoLike } from './use-video-like'

/** Video page state: the video, who may manage it, likes (also by double tap), and view counting. */
export const useVideoDetails = (videoId: string) => {
  const { user } = useAuth()
  const { video, isLoading, error, refetch } = useVideo(videoId)
  const recordView = useRecordView(videoId)
  const like = useVideoLike(video ?? { id: videoId, isLiked: false, likesCount: 0 }, PAGE_ROUTES.video(videoId))
  const canManage = Boolean(user && video && (user.id === video.owner.id || user.role === Role.ADMIN))
  const likeOnDoubleTap = () => {
    if (video && !video.isLiked) like.toggleLike()
  }
  return { video, isLoading, error, refetch, isMissing: isNotFoundError(error), canManage, recordView, toggleLike: like.toggleLike, likeOnDoubleTap }
}
