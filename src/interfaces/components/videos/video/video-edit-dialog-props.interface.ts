import type { Video } from '@/interfaces/videos/video/video.interface'
import type { VideoFormValues } from '@/validations/videos/video/video-form.validation'

export interface VideoEditDialogProps {
  video: Video
  isOpen: boolean
  onClose: () => void
  onSave: (values: VideoFormValues) => Promise<unknown>
}
