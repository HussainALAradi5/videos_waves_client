import type { PropsWithChildren, ReactNode } from 'react'

export interface BottomSheetProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
}
