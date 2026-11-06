import NextLink from 'next/link'
import { Card, HStack, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { VideoCardProps } from '@/interfaces/components/videos/video/video-card-props.interface'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { VideoPlayer } from './video-player'
import { VideoStats } from './video-stats'
import { LikeButton } from './like-button'

export function VideoCard({ video }: VideoCardProps) {
  const href = PAGE_ROUTES.video(video.id)

  return (
    <LinkBox asChild>
      <Card.Root
        overflow="hidden"
        h="full"
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      >
        <VideoPlayer src={video.videoUrl} title={video.title} isPreview />
        <Card.Body gap="3" p="4">
          <LinkOverlay asChild>
            <NextLink href={href}>
              <Text fontWeight="semibold" fontSize="lg" lineClamp={1}>
                {video.title}
              </Text>
            </NextLink>
          </LinkOverlay>
          <HStack gap="2">
            <UserAvatar user={video.owner} size="xs" />
            <Stack gap="0">
              <Text fontSize="sm">{video.owner.userName}</Text>
              <Text fontSize="xs" color="fg.muted">
                {formatRelativeDate(video.createdAt)}
              </Text>
            </Stack>
          </HStack>
        </Card.Body>
        <Card.Footer px="4" pb="4" pt="0" justifyContent="space-between">
          <VideoStats commentsCount={video.commentsCount} viewsCount={video.viewsCount} />
          {/* Sits above the card link so pressing like does not open the video. */}
          <HStack position="relative" zIndex="1">
            <LikeButton video={video} returnTo={href} />
          </HStack>
        </Card.Footer>
      </Card.Root>
    </LinkBox>
  )
}
