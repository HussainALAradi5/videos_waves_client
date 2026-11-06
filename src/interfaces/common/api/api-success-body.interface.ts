import type { CursorMeta } from '../pagination/cursor-meta.interface'
import type { PageMeta } from '../pagination/page-meta.interface'

export interface ApiSuccessBody<T> {
  success: true
  data: T
  meta?: PageMeta | CursorMeta
}
