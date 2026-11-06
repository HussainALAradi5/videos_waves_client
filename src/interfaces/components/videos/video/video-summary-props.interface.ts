import type { Video } from '@/interfaces/videos/video/video.interface'

export interface VideoSummaryProps {
  video: Video
  canManage: boolean
  onToggleLike: () => void
}
