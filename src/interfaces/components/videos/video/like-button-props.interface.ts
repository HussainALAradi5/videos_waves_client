import type { Video } from '@/interfaces/videos/video/video.interface'

export interface LikeButtonProps {
  video: Pick<Video, 'id' | 'isLiked' | 'likesCount'>
  /** Where to come back to after signing in, when a guest presses like. */
  returnTo: string
}
