import type { QueryKey } from '@tanstack/react-query'
import type { CursorPage } from '@/interfaces/common/pagination/cursor-page.interface'

export interface CursorListOptions<T> {
  queryKey: QueryKey
  fetchPage: (before: string | undefined, signal: AbortSignal) => Promise<CursorPage<T>>
  isEnabled?: boolean
}
