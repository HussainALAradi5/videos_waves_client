import { LuCircleAlert, LuCircleCheck, LuInfo, LuTriangleAlert } from 'react-icons/lu'
import { ToastType } from '@/enums/common/toast-type.enum'
import type { ToastLook } from '@/interfaces/common/toast/toast-look.interface'

export const TOAST_LOOKS: Record<ToastType, ToastLook> = {
  [ToastType.SUCCESS]: { icon: LuCircleCheck, accent: 'green.500', label: 'Success' },
  [ToastType.ERROR]: { icon: LuCircleAlert, accent: 'red.500', label: 'Error' },
  [ToastType.WARNING]: { icon: LuTriangleAlert, accent: 'orange.400', label: 'Warning' },
  [ToastType.INFO]: { icon: LuInfo, accent: 'brand.solid', label: 'Info' }
}

/** At most this many show at once; the rest wait their turn (their countdown starts when shown). */
export const TOAST_MAX_VISIBLE = 4
/** Older toasts beyond this are dropped so a burst never piles up. */
export const TOAST_MAX_QUEUED = 12
export const TOAST_CLOSE_LABEL = 'Dismiss'
export const TOAST_REGION_LABEL = 'Notifications'

export const TOAST_MOTION = {
  initial: { opacity: 0, x: 48, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 48, scale: 0.96, transition: { duration: 0.18 } },
  transition: { type: 'spring', stiffness: 420, damping: 32 }
} as const
