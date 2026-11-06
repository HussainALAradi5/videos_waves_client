import type { PropsWithChildren, ReactNode } from 'react'

export interface GenericModalProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  footer?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
