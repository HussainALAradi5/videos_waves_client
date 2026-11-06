import type { PropsWithChildren } from 'react'

export interface ConfirmDialogProps extends PropsWithChildren {
  isOpen: boolean
  title: string
  description: string
  confirmLabel: string
  /** May return a promise; the button stays busy until it settles. */
  onConfirm: () => unknown
  onClose: () => void
  isLoading?: boolean
}
