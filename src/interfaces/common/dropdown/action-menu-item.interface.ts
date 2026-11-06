import type { ReactNode } from 'react'

/** One entry of an ActionMenu (the three-dots menu). */
export interface ActionMenuItem {
  key: string
  label: string
  icon?: ReactNode
  /** Danger items are red and separated from the rest. */
  isDanger?: boolean
  isHidden?: boolean
  onSelect: () => void
}
