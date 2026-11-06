'use client'

import NextLink from 'next/link'
import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import type { VideoSummaryProps } from '@/interfaces/components/videos/video/video-summary-props.interface'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { formatCount } from '@/utilities/format/count-format.utility'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { VideoOwnerFollow } from './video-owner-follow'
import { LikeButton } from './like-button'
import { VideoActions } from './video-actions'

/** Title, owner with Follow, like, menu, views, and description under the player. */
export function VideoSummary({ video, canManage, onToggleLike }: VideoSummaryProps) {
  const { user } = useAuth()
  const isMine = user?.id === video.owner.id
  return (
    <Stack gap="4" mt="5">
      <Heading size="xl">{video.title}</Heading>
      <Flex gap="3" justify="space-between" align="center" wrap="wrap">
        <HStack gap="3">
          <NextLink href={PAGE_ROUTES.profile(video.owner.userName)}>
            <UserAvatar user={video.owner} size="md" hasRing />
          </NextLink>
          <Text asChild fontWeight="semibold">
            <NextLink href={PAGE_ROUTES.profile(video.owner.userName)}>{video.owner.userName}</NextLink>
          </Text>
          {!isMine && user && <VideoOwnerFollow userName={video.owner.userName} />}
        </HStack>
        <HStack gap="2">
          <LikeButton isLiked={video.isLiked} likesCount={video.likesCount} onToggle={onToggleLike} />
          <VideoActions video={video} canManage={canManage} />
        </HStack>
      </Flex>
      <Stack gap="2" p="4" rounded="2xl" bg="app.surface" borderWidth="1px" borderColor="app.border">
        <Text fontSize="sm" fontWeight="semibold">
          {VIDEO_MESSAGES.VIEWS(formatCount(video.viewsCount))} · {formatRelativeDate(video.createdAt)}
        </Text>
        {video.description && <Text whiteSpace="pre-wrap">{video.description}</Text>}
      </Stack>
    </Stack>
  )
}
