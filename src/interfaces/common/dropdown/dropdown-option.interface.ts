import type { ReactNode } from 'react'

/** One choice in a select or multi-select dropdown. */
export interface DropdownOption {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  isDisabled?: boolean
}
