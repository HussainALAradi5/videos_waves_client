import type { ReactNode } from 'react'

export interface TabItem {
  value: string
  label: string
  icon?: ReactNode
  /** A small count bubble (unread, requests). */
  badge?: number
}
