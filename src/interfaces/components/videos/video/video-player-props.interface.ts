import type { Video } from '@/interfaces/videos/video/video.interface'

export interface VideoPlayerProps {
  video: Video
  onPlay: () => void
  /** Called on a double tap; likes the video. */
  onDoubleTap: () => void
}
