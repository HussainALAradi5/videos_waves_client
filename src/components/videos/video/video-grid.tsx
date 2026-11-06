'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import type { VideoGridProps } from '@/interfaces/components/videos/video/video-grid-props.interface'
import { useVideoFeed } from '@/hooks/videos/video/use-video-feed'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { ErrorState } from '@/components/common/feedback/error-state'
import { SkeletonGrid } from '@/components/common/feedback/skeleton-grid'
import { InfiniteGrid } from '@/components/common/lists/infinite-grid'
import { VideoCard } from './video-card'

/** A paged, infinitely scrolling grid of videos for any feed query. */
export function VideoGrid({ query, emptyTitle, emptyDescription }: VideoGridProps) {
  const feed = useVideoFeed(query)
  if (feed.isLoading) return <SkeletonGrid />
  if (feed.error) return <ErrorState error={feed.error} onRetry={() => void feed.refetch()} />
  if (feed.videos.length === 0) return <EmptyState title={emptyTitle} description={emptyDescription} />
  return (
    <InfiniteGrid
      items={feed.videos}
      getKey={(video) => video.id}
      renderItem={(video) => <VideoCard video={video} />}
      hasNextPage={feed.hasNextPage}
      isFetchingNextPage={feed.isFetchingNextPage}
      onLoadMore={feed.fetchNextPage}
      endLabel={MESSAGES.VIDEOS.END_OF_FEED}
    />
  )
}
