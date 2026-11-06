import type { UploadItem } from '@/interfaces/media/media/upload-item.interface'

export interface FilePreviewGridProps {
  items: UploadItem[]
  onRemove: (key: string) => void
  onRetry: (item: UploadItem) => void
}
