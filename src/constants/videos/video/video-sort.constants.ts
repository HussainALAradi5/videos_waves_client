import { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'

export const VIDEO_SORT_OPTIONS: { value: VideoSortField; label: string }[] = [
  { value: VideoSortField.CREATED_AT, label: 'Newest' },
  { value: VideoSortField.LIKES_COUNT, label: 'Most liked' },
  { value: VideoSortField.VIEWS_COUNT, label: 'Most viewed' },
  { value: VideoSortField.TITLE, label: 'Title' }
]

export const VIDEO_ACCEPT = { 'video/*': [] as string[] }
