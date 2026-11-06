import type { PageMeta } from './page-meta.interface'

export interface Page<T> {
  items: T[]
  meta: PageMeta
}
