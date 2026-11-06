import type { IconType } from 'react-icons'

/** How one toast type looks: its icon, accent colour token, and the label read by screen readers. */
export interface ToastLook {
  icon: IconType
  accent: string
  label: string
}
