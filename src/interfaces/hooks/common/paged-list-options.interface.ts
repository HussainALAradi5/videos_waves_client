import type { QueryKey } from '@tanstack/react-query'
import type { Page } from '@/interfaces/common/pagination/page.interface'

export interface PagedListOptions<T> {
  queryKey: QueryKey
  fetchPage: (page: number, signal: AbortSignal) => Promise<Page<T>>
  isEnabled?: boolean
}
