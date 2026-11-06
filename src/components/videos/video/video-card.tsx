'use client'

import NextLink from 'next/link'
import { AspectRatio, Badge, Box, HStack, Stack, Text } from '@chakra-ui/react'
import { PRESS } from '@/constants/common/motion.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { VideoCardProps } from '@/interfaces/components/videos/video/video-card-props.interface'
import { useHoverPreview } from '@/hooks/videos/video/use-hover-preview'
import { formatDuration } from '@/utilities/format/duration-format.utility'
import { MotionBox } from '@/components/common/motion/motion-box'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { VideoCardStats } from './video-card-stats'

/** A feed tile: the clip previews on hover, lifts slightly, and links to the video page. */
export function VideoCard({ video }: VideoCardProps) {
  const { videoRef, onPointerEnter, onPointerLeave } = useHoverPreview()
  const duration = formatDuration(video.durationSeconds)

  return (
    <MotionBox whileHover={PRESS.whileHover} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <Stack gap="3">
        <NextLink href={PAGE_ROUTES.video(video.id)} aria-label={video.title}>
          <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO}>
            <Box rounded="2xl" overflow="hidden" bg="black" shadow="card" position="relative">
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnailUrl ?? undefined}
                muted
                loop
                playsInline
                preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box position="absolute" insetX="0" bottom="0" height="40%" bgGradient="to-t" gradientFrom="blackAlpha.700" gradientTo="transparent" />
              {duration && (
                <Badge position="absolute" bottom="2" right="2" rounded="md" bg="blackAlpha.700" color="white">
                  {duration}
                </Badge>
              )}
              <VideoCardStats likes={video.likesCount} comments={video.commentsCount} />
            </Box>
          </AspectRatio>
        </NextLink>
        <HStack gap="3" align="flex-start">
          <NextLink href={PAGE_ROUTES.profile(video.owner.userName)}>
            <UserAvatar user={video.owner} size="sm" />
          </NextLink>
          <Stack gap="0.5" minW="0">
            <Text fontWeight="semibold" lineClamp={2}>
              {video.title}
            </Text>
            <Text asChild fontSize="sm" color="fg.muted" _hover={{ color: 'fg' }}>
              <NextLink href={PAGE_ROUTES.profile(video.owner.userName)}>{video.owner.userName}</NextLink>
            </Text>
          </Stack>
        </HStack>
      </Stack>
    </MotionBox>
  )
}
