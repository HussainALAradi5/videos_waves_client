import type { UploadItem } from '@/interfaces/media/media/upload-item.interface'
import type { UploadDraft } from '@/interfaces/videos/video/upload-draft.interface'

export interface UploadDraftCardProps {
  item: UploadItem
  draft: UploadDraft
  onChange: (changes: Partial<UploadDraft>) => void
  onRemove: () => void
}
