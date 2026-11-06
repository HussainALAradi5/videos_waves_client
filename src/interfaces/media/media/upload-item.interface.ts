import type { UploadStatus } from '@/enums/media/media/upload-status.enum'
import type { Media } from './media.interface'

/** One file in a multi-file upload queue. */
export interface UploadItem {
  key: string
  file: File
  previewUrl: string
  progress: number
  status: UploadStatus
  error: string | null
  media: Media | null
}
