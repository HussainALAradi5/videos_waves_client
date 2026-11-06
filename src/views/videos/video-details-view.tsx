'use client'

import NextLink from 'next/link'
import { Grid, GridItem } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useVideoDetails } from '@/hooks/videos/video/use-video-details'
import type { VideoDetailsViewProps } from '@/interfaces/components/views/video-details-view-props.interface'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { QueryState } from '@/components/common/feedback/query-state'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { VideoPlayer } from '@/components/videos/video/video-player'
import { VideoSummary } from '@/components/videos/video/video-summary'
import { CommentSection } from '@/components/videos/comment/comment-section'

/** Player and details on the left; comments beside them on wide screens, below on phones. */
export function VideoDetailsView({ videoId }: VideoDetailsViewProps) {
  const details = useVideoDetails(videoId)
  if (details.isMissing) {
    return (
      <EmptyState
        title={MESSAGES.VIDEOS.NOT_FOUND}
        action={
          <GenericButton asChild tone="outline">
            <NextLink href={PAGE_ROUTES.HOME}>{MESSAGES.COMMON.BACK_HOME}</NextLink>
          </GenericButton>
        }
      />
    )
  }
  return (
    <QueryState isLoading={details.isLoading} error={details.error} onRetry={() => void details.refetch()}>
      {details.video && (
        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) 24rem' }} gap="8">
          <GridItem>
            <VideoPlayer video={details.video} onPlay={details.recordView} onDoubleTap={details.likeOnDoubleTap} />
            <VideoSummary video={details.video} canManage={details.canManage} onToggleLike={details.toggleLike} />
          </GridItem>
          <GridItem>
            <CommentSection videoId={details.video.id} videoOwnerId={details.video.owner.id} />
          </GridItem>
        </Grid>
      )}
    </QueryState>
  )
}
