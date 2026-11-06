'use client'

import { Role } from '@/enums/users/roles/role.enum'
import { isNotFoundError } from '@/utilities/errors/api-error.utility'
import { useAuth } from '../../users/auth/use-auth'
import { useRecordView } from './use-record-view'
import { useVideo } from './use-video'

/** Video page state: the video, whether the viewer may manage it, and view counting. */
export const useVideoDetails = (videoId: string) => {
  const { user } = useAuth()
  const { video, isLoading, error, refetch } = useVideo(videoId)
  const recordView = useRecordView(videoId)
  const canManage = Boolean(user && video && (user.id === video.owner.id || user.role === Role.ADMIN))

  return { video, isLoading, error, refetch, isMissing: isNotFoundError(error), canManage, recordView }
}
