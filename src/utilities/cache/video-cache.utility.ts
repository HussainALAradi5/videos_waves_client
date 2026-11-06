import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { Page } from '@/interfaces/common/pagination/page.interface'
import type { Video } from '@/interfaces/videos/video/video.interface'

type VideoCacheEntry = InfiniteData<Page<Video>> | Video | undefined

const patchEntry = (entry: VideoCacheEntry, videoId: string, patch: (video: Video) => Partial<Video>): VideoCacheEntry => {
  if (!entry) return entry
  if ('pages' in entry) {
    return {
      ...entry,
      pages: entry.pages.map((page) => ({
        ...page,
        items: page.items.map((video) => (video.id === videoId ? { ...video, ...patch(video) } : video))
      }))
    }
  }
  return entry.id === videoId ? { ...entry, ...patch(entry) } : entry
}

/** Updates one video everywhere it is cached (feeds and detail) without refetching. */
export const patchVideoInCache = (
  queryClient: QueryClient,
  videoId: string,
  patch: (video: Video) => Partial<Video>
): void => {
  queryClient.setQueriesData<VideoCacheEntry>({ queryKey: QUERY_KEYS.videos }, (entry) =>
    patchEntry(entry, videoId, patch)
  )
}
