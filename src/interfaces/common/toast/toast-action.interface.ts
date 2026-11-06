/** The single button a toast may carry, such as Undo or Open. */
export interface ToastAction {
  label: string
  onClick: () => void
}
