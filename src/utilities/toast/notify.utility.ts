import { UNDO_LABEL, UNDO_TOAST_MS } from '@/constants/common/undo.constants'
import { ToastType } from '@/enums/common/toast-type.enum'
import type { ToastOptions } from '@/interfaces/common/toast/toast-options.interface'
import { toastStore } from '@/services/toast/toast-store.service'
import { getErrorMessage } from '../errors/api-error.utility'

/** Shows a toast of any type; returns its id. */
export const notify = (type: ToastType, title: string, options?: ToastOptions): number => toastStore.show(type, title, options)

export const notifySuccess = (title: string, options?: ToastOptions): void => {
  notify(ToastType.SUCCESS, title, options)
}

export const notifyInfo = (title: string, options?: ToastOptions): void => {
  notify(ToastType.INFO, title, options)
}

export const notifyWarning = (title: string, options?: ToastOptions): void => {
  notify(ToastType.WARNING, title, options)
}

export const notifyError = (error: unknown): void => {
  notify(ToastType.ERROR, getErrorMessage(error))
}

/** "Comment deleted - Undo": the action button restores what was just removed. */
export const notifyUndo = (title: string, onUndo: () => void, options: Pick<ToastOptions, 'durationMs' | 'isPausable'> = {}): void => {
  notify(ToastType.INFO, title, { durationMs: UNDO_TOAST_MS, ...options, action: { label: UNDO_LABEL, onClick: onUndo } })
}
