'use client'

import { useRouter } from 'next/navigation'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import type { Video } from '@/interfaces/videos/video/video.interface'
import { notifySuccess } from '@/utilities/toast/notify.utility'

export const SHARE_VIDEO_QUERY_PARAM = 'shareVideo'

/** Copy a video link, or open Messages with the video ready to send. */
export const useShareLink = (video: Pick<Video, 'id'>) => {
  const router = useRouter()
  return {
    copyLink: () => {
      void navigator.clipboard.writeText(`${window.location.origin}${PAGE_ROUTES.video(video.id)}`)
      notifySuccess(VIDEO_MESSAGES.LINK_COPIED)
    },
    shareInChat: () => router.push(`${PAGE_ROUTES.MESSAGES}?${SHARE_VIDEO_QUERY_PARAM}=${encodeURIComponent(video.id)}`)
  }
}
