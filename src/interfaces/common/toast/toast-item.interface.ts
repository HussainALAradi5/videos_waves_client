import type { ToastType } from '@/enums/common/toast-type.enum'
import type { ToastAction } from './toast-action.interface'

export interface ToastItem {
  id: number
  type: ToastType
  title: string
  description?: string
  durationMs: number
  action?: ToastAction
  isPausable: boolean
}
