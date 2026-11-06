import type { MediaKind } from '@/enums/media/media/media-kind.enum'
import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'

export interface Media extends BaseEntity {
  kind: MediaKind
  /** Public CDN URL, or a short-lived signed URL for private media. */
  url: string
  thumbnailUrl: string | null
  mimeType: string
  sizeBytes: number
  width: number | null
  height: number | null
  durationSeconds: number | null
  originalName: string
}
