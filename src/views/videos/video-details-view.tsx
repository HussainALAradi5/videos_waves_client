'use client'

import NextLink from 'next/link'
import { Box, Button } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useVideoDetails } from '@/hooks/videos/video/use-video-details'
import type { VideoDetailsViewProps } from '@/interfaces/components/views/video-details-view-props.interface'
import { QueryState } from '@/components/common/feedback/query-state'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { VideoPlayer } from '@/components/videos/video/video-player'
import { VideoSummary } from '@/components/videos/video/video-summary'
import { VideoOwnerActions } from '@/components/videos/video/video-owner-actions'
import { CommentSection } from '@/components/videos/comment/comment-section'

export function VideoDetailsView({ videoId }: VideoDetailsViewProps) {
  const { video, isLoading, error, refetch, isMissing, canManage, recordView } = useVideoDetails(videoId)

  if (isMissing) {
    return (
      <EmptyState
        title={MESSAGES.VIDEOS.NOT_FOUND}
        action={
          <Button asChild variant="outline">
            <NextLink href={PAGE_ROUTES.HOME}>{MESSAGES.COMMON.BACK_HOME}</NextLink>
          </Button>
        }
      />
    )
  }

  return (
    <QueryState isLoading={isLoading} error={error} onRetry={() => void refetch()}>
      {video && (
        <Box maxW="4xl" mx="auto">
          <VideoPlayer src={video.videoUrl} title={video.title} onPlay={recordView} />
          <VideoSummary video={video} actions={canManage ? <VideoOwnerActions video={video} /> : undefined} />
          <CommentSection videoId={video.id} />
        </Box>
      )}
    </QueryState>
  )
}
