import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'
import type { AdminRequestQueryDto } from '@/dtos/users/admin-request/admin-request-query.dto'

export const QUERY_KEYS = {
  me: ['users', 'me'] as const,
  videos: ['videos'] as const,
  videoFeed: (query: VideoQueryDto) => ['videos', 'feed', query] as const,
  video: (videoId: string) => ['videos', 'detail', videoId] as const,
  // Kept outside the 'videos' prefix so video cache patches never touch comment pages.
  comments: (videoId: string) => ['comments', videoId] as const,
  adminRequests: ['admin-requests'] as const,
  adminRequestPage: (query: AdminRequestQueryDto) => ['admin-requests', query] as const
}
