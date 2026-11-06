import type { FeedScope } from '@/enums/videos/video/feed-scope.enum'
import type { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'

export interface FeedToolbarProps {
  scope: FeedScope
  onScopeChange: (scope: FeedScope) => void
  search: string
  onSearchChange: (search: string) => void
  sortBy: VideoSortField
  onSortChange: (sortBy: VideoSortField) => void
  canSeeFollowing: boolean
}
