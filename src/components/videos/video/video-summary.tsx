import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { VideoSummaryProps } from '@/interfaces/components/videos/video/video-summary-props.interface'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { LikeButton } from './like-button'
import { VideoStats } from './video-stats'

export function VideoSummary({ video, actions }: VideoSummaryProps) {
  return (
    <Stack gap="4" mt="6">
      <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
        {video.title}
      </Heading>
      <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap="4" wrap="wrap">
        <HStack gap="3">
          <UserAvatar user={video.owner} size="md" />
          <Stack gap="0">
            <Text fontWeight="medium">{video.owner.userName}</Text>
            <Text fontSize="sm" color="fg.muted">
              {formatRelativeDate(video.createdAt)}
            </Text>
          </Stack>
        </HStack>
        <HStack gap="4" wrap="wrap">
          <VideoStats commentsCount={video.commentsCount} viewsCount={video.viewsCount} />
          <LikeButton video={video} returnTo={PAGE_ROUTES.video(video.id)} />
          {actions}
        </HStack>
      </Flex>
      {video.description && (
        <Text whiteSpace="pre-wrap" color="fg.muted" bg="bg.subtle" p="4" borderRadius="lg">
          {video.description}
        </Text>
      )}
    </Stack>
  )
}
