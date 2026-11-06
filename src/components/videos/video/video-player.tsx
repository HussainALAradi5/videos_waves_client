import { AspectRatio, Box, chakra } from '@chakra-ui/react'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { VideoPlayerProps } from '@/interfaces/components/videos/video/video-player-props.interface'

// Seeking slightly past zero makes browsers paint the first frame as a thumbnail.
const PREVIEW_FRAGMENT = '#t=0.1'

export function VideoPlayer({ src, title, isPreview = false, onPlay }: VideoPlayerProps) {
  return (
    <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO} bg="black" borderRadius={isPreview ? undefined : 'xl'} overflow="hidden">
      <Box>
        <chakra.video
          src={isPreview ? `${src}${PREVIEW_FRAGMENT}` : src}
          title={title}
          aria-label={title}
          controls={!isPreview}
          muted={isPreview}
          playsInline
          preload="metadata"
          onPlay={onPlay}
          w="full"
          h="full"
          objectFit="contain"
        />
      </Box>
    </AspectRatio>
  )
}
