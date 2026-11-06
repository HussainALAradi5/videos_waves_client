import type { ReactNode } from 'react'
import type { Video } from '@/interfaces/videos/video/video.interface'

export interface VideoSummaryProps {
  video: Video
  actions?: ReactNode
}
