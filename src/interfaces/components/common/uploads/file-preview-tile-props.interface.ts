import type { UploadItem } from '@/interfaces/media/media/upload-item.interface'

export interface FilePreviewTileProps {
  item: UploadItem
  onRemove: (key: string) => void
  onRetry: (item: UploadItem) => void
}
