import type { ReactNode } from 'react'

/** One choice in a select or multi-select dropdown. */
export interface DropdownOption {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  /** Shows the label as a coloured badge, matching the badges in tables (roles, statuses). */
  colorPalette?: string
  isDisabled?: boolean
}
