import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'

export interface VideoGridProps {
  query: Omit<VideoQueryDto, 'page'>
  emptyTitle: string
  emptyDescription: string
}
