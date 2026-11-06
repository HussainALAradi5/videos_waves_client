import { SESSION_EXPIRED_EVENT } from '@/constants/common/storage-keys.constants'

export const emitSessionExpired = (): void => {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
}

/** Subscribes to session expiry and returns the unsubscribe function. */
export const onSessionExpired = (listener: () => void): (() => void) => {
  window.addEventListener(SESSION_EXPIRED_EVENT, listener)
  return () => window.removeEventListener(SESSION_EXPIRED_EVENT, listener)
}
