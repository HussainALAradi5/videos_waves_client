'use client'

import { Button } from '@chakra-ui/react'
import { LuHeart } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { useVideoLike } from '@/hooks/videos/video/use-video-like'
import type { LikeButtonProps } from '@/interfaces/components/videos/video/like-button-props.interface'
import { formatCount } from '@/utilities/format/count-format.utility'

export function LikeButton({ video, returnTo }: LikeButtonProps) {
  const { toggleLike, isPending } = useVideoLike(video, returnTo)

  return (
    <Button
      size="sm"
      variant={video.isLiked ? 'solid' : 'outline'}
      colorPalette={video.isLiked ? PALETTES.DANGER : PALETTES.NEUTRAL}
      onClick={toggleLike}
      disabled={isPending}
      aria-pressed={video.isLiked}
      aria-label={video.isLiked ? MESSAGES.VIDEOS.UNLIKE : MESSAGES.VIDEOS.LIKE}
    >
      <LuHeart fill={video.isLiked ? 'currentColor' : 'none'} />
      {formatCount(video.likesCount)}
    </Button>
  )
}
