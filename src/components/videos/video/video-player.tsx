'use client'

import { AspectRatio, Box } from '@chakra-ui/react'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { VideoPlayerProps } from '@/interfaces/components/videos/video/video-player-props.interface'
import { useDoubleTap } from '@/hooks/videos/video/use-double-tap'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { HeartBurst } from './heart-burst'

/** The video page player: double tap (or double click) to like, autoplay muted when the setting is on. */
export function VideoPlayer({ video, onPlay, onDoubleTap }: VideoPlayerProps) {
  const { autoplayVideos } = useSettings()
  const { burstKey, onDoubleClick, onPointerUp } = useDoubleTap(onDoubleTap)

  return (
    <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO}>
      <Box rounded="3xl" overflow="hidden" bg="black" shadow="card" position="relative" onDoubleClick={onDoubleClick} onPointerUp={onPointerUp}>
        <video
          src={video.videoUrl}
          poster={video.thumbnailUrl ?? undefined}
          controls
          playsInline
          autoPlay={autoplayVideos}
          muted={autoplayVideos}
          onPlay={onPlay}
          aria-label={video.title}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <HeartBurst burstKey={burstKey} />
      </Box>
    </AspectRatio>
  )
}
