import type { SortDirection } from '@/enums/common/sort-direction.enum'

/** Shared page request; domain queries extend it with their own filters and sort fields. */
export interface PageRequestDto<TSortField extends string = string> {
  page?: number
  pageSize?: number
  sortBy?: TSortField
  sortDirection?: SortDirection
}
