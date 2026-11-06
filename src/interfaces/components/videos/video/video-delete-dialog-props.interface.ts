import type { Video } from '@/interfaces/videos/video/video.interface'

export interface VideoDeleteDialogProps {
  video: Video
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<unknown>
}
