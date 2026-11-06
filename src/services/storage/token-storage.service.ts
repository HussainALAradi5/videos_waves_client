import { STORAGE_KEYS, TOKENS_CHANGED_EVENT } from '@/constants/common/storage-keys.constants'
import type { AuthTokens } from '@/interfaces/users/auth/auth-tokens.interface'

const notifyChange = (): void => {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(TOKENS_CHANGED_EVENT))
}

// Storage can be unavailable (server render, private mode, blocked site data), so every access is guarded.
const read = (key: string): string | null => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const write = (key: string, value: string | null): void => {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    // Without storage the session lasts only for this page load.
  }
}

export const tokenStorage = {
  getAccessToken: (): string | null => read(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: (): string | null => read(STORAGE_KEYS.REFRESH_TOKEN),
  hasSession: (): boolean => read(STORAGE_KEYS.REFRESH_TOKEN) !== null,
  setTokens: (tokens: AuthTokens): void => {
    write(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken)
    write(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken)
    notifyChange()
  },
  clear: (): void => {
    write(STORAGE_KEYS.ACCESS_TOKEN, null)
    write(STORAGE_KEYS.REFRESH_TOKEN, null)
    notifyChange()
  },
  /** For useSyncExternalStore: fires on changes in this tab and in other tabs. */
  subscribe: (listener: () => void): (() => void) => {
    window.addEventListener(TOKENS_CHANGED_EVENT, listener)
    window.addEventListener('storage', listener)
    return () => {
      window.removeEventListener(TOKENS_CHANGED_EVENT, listener)
      window.removeEventListener('storage', listener)
    }
  }
}
