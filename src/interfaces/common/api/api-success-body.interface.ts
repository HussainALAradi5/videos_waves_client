import type { PageMeta } from '../pagination/page-meta.interface'

export interface ApiSuccessBody<T> {
  success: true
  data: T
  meta?: PageMeta
}
