export interface LoadMoreProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
  label?: string
}
