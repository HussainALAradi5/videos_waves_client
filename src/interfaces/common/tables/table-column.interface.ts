import type { ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  /** Hide the column below this breakpoint to keep narrow screens readable. */
  hideBelow?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'end'
}
