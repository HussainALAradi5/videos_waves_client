import type { TableColumn } from '@/interfaces/common/tables/table-column.interface'

export interface DataTableProps<T> {
  columns: TableColumn<T>[]
  rows: T[]
  getKey: (row: T) => string
  caption?: string
}
