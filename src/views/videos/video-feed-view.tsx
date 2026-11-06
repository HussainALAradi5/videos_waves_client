'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import { useFeedFilters } from '@/hooks/videos/video/use-feed-filters'
import { PageHeader } from '@/components/common/layout/page-header'
import { VideoFeedFilters } from '@/components/videos/video/video-feed-filters'
import { VideoInfiniteGrid } from '@/components/videos/video/video-infinite-grid'

export function VideoFeedView() {
  const { search, setSearch, sortBy, setSortBy, query } = useFeedFilters()

  return (
    <>
      <PageHeader title={MESSAGES.VIDEOS.FEED_TITLE} description={MESSAGES.VIDEOS.FEED_DESCRIPTION} />
      <VideoFeedFilters search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} />
      <VideoInfiniteGrid
        query={query}
        emptyTitle={MESSAGES.VIDEOS.EMPTY_TITLE}
        emptyDescription={MESSAGES.VIDEOS.EMPTY_DESCRIPTION}
      />
    </>
  )
}
