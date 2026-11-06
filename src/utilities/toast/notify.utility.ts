import { toaster } from '@/config/ui/toaster.config'
import { TOAST_DURATION_MS } from '@/constants/common/limits.constants'
import { UNDO_LABEL, UNDO_TOAST_MS } from '@/constants/common/undo.constants'
import { getErrorMessage } from '../errors/api-error.utility'

export const notifySuccess = (title: string): void => {
  toaster.create({ type: 'success', title, duration: TOAST_DURATION_MS })
}

export const notifyInfo = (title: string): void => {
  toaster.create({ type: 'info', title, duration: TOAST_DURATION_MS })
}

export const notifyError = (error: unknown): void => {
  toaster.create({ type: 'error', title: getErrorMessage(error), duration: TOAST_DURATION_MS })
}

/** "Comment deleted - Undo": the action button restores what was just removed. */
export const notifyUndo = (title: string, onUndo: () => void): void => {
  toaster.create({ type: 'info', title, duration: UNDO_TOAST_MS, action: { label: UNDO_LABEL, onClick: onUndo } })
}
