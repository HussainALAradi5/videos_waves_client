import type { PageRequestDto } from '@/dtos/common/pagination/page-request.dto'
import type { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'

export interface VideoQueryDto extends PageRequestDto<VideoSortField> {
  search?: string
  ownerId?: string
}
