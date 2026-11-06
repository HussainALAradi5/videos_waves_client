import type { ToastAction } from './toast-action.interface'

export interface ToastOptions {
  description?: string
  /** How long it stays; hovering pauses the countdown. */
  durationMs?: number
  action?: ToastAction
  /** False for deadlines that must not stretch (unsend Undo); hovering then does not pause. Default true. */
  isPausable?: boolean
}
