import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'

export interface VideoInfiniteGridProps {
  query: Omit<VideoQueryDto, 'page'>
  emptyTitle: string
  emptyDescription?: string
  columns?: Record<string, number>
}
