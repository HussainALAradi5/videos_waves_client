import type { ReactNode } from 'react'
import type { ActionMenuItem } from '@/interfaces/common/dropdown/action-menu-item.interface'

export interface ActionMenuProps {
  items: ActionMenuItem[]
  /** Accessible name of the trigger ("Comment options"). */
  label: string
  /** Replaces the default three-dots trigger. */
  trigger?: ReactNode
  size?: 'xs' | 'sm' | 'md'
}
