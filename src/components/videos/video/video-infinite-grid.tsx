'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import { useVideoFeed } from '@/hooks/videos/video/use-video-feed'
import type { Video } from '@/interfaces/videos/video/video.interface'
import type { VideoInfiniteGridProps } from '@/interfaces/components/videos/video/video-infinite-grid-props.interface'
import { QueryState } from '@/components/common/feedback/query-state'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { InfiniteGrid } from '@/components/common/lists/infinite-grid'
import { VideoCard } from './video-card'

const getVideoKey = (video: Video) => video.id
const renderVideo = (video: Video) => <VideoCard video={video} />

/** Any server-filtered video list: the home feed and "my videos" both use it. */
export function VideoInfiniteGrid({ query, emptyTitle, emptyDescription, columns }: VideoInfiniteGridProps) {
  const feed = useVideoFeed(query)

  return (
    <QueryState
      isLoading={feed.isLoading}
      error={feed.error}
      onRetry={() => void feed.refetch()}
      isEmpty={feed.videos.length === 0}
      empty={<EmptyState title={emptyTitle} description={emptyDescription} />}
    >
      <InfiniteGrid
        items={feed.videos}
        getKey={getVideoKey}
        renderItem={renderVideo}
        hasNextPage={feed.hasNextPage}
        isFetchingNextPage={feed.isFetchingNextPage}
        onLoadMore={feed.fetchNextPage}
        endLabel={MESSAGES.VIDEOS.END_OF_FEED}
        columns={columns}
      />
    </QueryState>
  )
}
