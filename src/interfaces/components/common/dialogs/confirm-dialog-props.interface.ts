export interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
  isLoading?: boolean
  /** Destructive actions default to the danger palette. */
  colorPalette?: string
}
