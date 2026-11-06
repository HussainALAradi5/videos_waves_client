import type { PageMeta } from '@/interfaces/common/pagination/page-meta.interface'

export interface PaginationControlsProps {
  meta: PageMeta
  onPageChange: (page: number) => void
}
