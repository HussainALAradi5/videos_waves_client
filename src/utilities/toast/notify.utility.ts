import { toaster } from '@/config/ui/toaster.config'
import { TOAST_DURATION_MS } from '@/constants/common/limits.constants'
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
