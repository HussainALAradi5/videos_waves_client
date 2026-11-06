export interface PagedListResult<T> {
  items: T[]
  totalItems: number
  isLoading: boolean
  error: Error | null
  refetch: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}
