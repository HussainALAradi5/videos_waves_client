import type { Page } from '@/interfaces/common/pagination/page.interface'

/** For infinite queries: the next page number, or undefined when the last page was loaded. */
export const getNextPageParam = <T>(lastPage: Page<T>): number | undefined =>
  lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined

export const flattenPages = <T>(pages: Page<T>[] | undefined): T[] => pages?.flatMap((page) => page.items) ?? []
