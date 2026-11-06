import type { ReactNode } from 'react'

export interface InfiniteGridProps<T> {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
  endLabel?: string
  columns?: Record<string, number>
}
