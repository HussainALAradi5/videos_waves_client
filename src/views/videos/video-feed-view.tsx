'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import { FeedScope } from '@/enums/videos/video/feed-scope.enum'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useFeedFilters } from '@/hooks/videos/video/use-feed-filters'
import { PageHeader } from '@/components/common/layout/page-header'
import { FeedToolbar } from '@/components/videos/video/feed-toolbar'
import { VideoGrid } from '@/components/videos/video/video-grid'

export function VideoFeedView() {
  const { isAuthenticated } = useAuth()
  const filters = useFeedFilters()
  const isFollowing = filters.scope === FeedScope.FOLLOWING

  return (
    <>
      <PageHeader title={MESSAGES.VIDEOS.FEED_TITLE} description={MESSAGES.VIDEOS.FEED_DESCRIPTION} />
      <FeedToolbar
        scope={filters.scope}
        onScopeChange={filters.setScope}
        search={filters.search}
        onSearchChange={filters.setSearch}
        sortBy={filters.sortBy}
        onSortChange={filters.setSortBy}
        canSeeFollowing={isAuthenticated}
      />
      <VideoGrid
        query={filters.query}
        emptyTitle={isFollowing ? VIDEO_MESSAGES.FOLLOWING_EMPTY_TITLE : MESSAGES.VIDEOS.EMPTY_TITLE}
        emptyDescription={isFollowing ? VIDEO_MESSAGES.FOLLOWING_EMPTY_DESCRIPTION : MESSAGES.VIDEOS.EMPTY_DESCRIPTION}
      />
    </>
  )
}
