import type { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'

export interface VideoFeedFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  sortBy: VideoSortField
  onSortChange: (value: VideoSortField) => void
}
