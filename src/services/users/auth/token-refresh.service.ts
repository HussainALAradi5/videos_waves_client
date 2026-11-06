import axios from 'axios'
import { apiConfig } from '@/config/api/api.config'
import { AUTH_ENDPOINTS } from '@/config/api/endpoints/auth.endpoints'
import { ACCESS_TOKEN_REFRESH_MARGIN_MS, REFRESH_LOCK_NAME, UNAUTHORIZED_STATUS } from '@/constants/users/auth/auth.constants'
import type { ApiSuccessBody } from '@/interfaces/common/api/api-success-body.interface'
import type { AuthTokens } from '@/interfaces/users/auth/auth-tokens.interface'
import { tokenStorage } from '@/services/storage/token-storage.service'
import { emitSessionExpired } from '@/utilities/auth/session-events.utility'
import { isTokenExpiring } from '@/utilities/auth/jwt.utility'

// A bare client without interceptors, so refreshing can never trigger another refresh.
const refreshClient = axios.create({ baseURL: apiConfig.baseURL, timeout: apiConfig.timeoutMs })

let pendingRefresh: Promise<string | null> | null = null

/** Runs `work` while holding a lock shared by every tab (falls back to no lock where unsupported). */
const withRefreshLock = <T>(work: () => Promise<T>): Promise<T> =>
  typeof navigator !== 'undefined' && navigator.locks
    ? (navigator.locks.request(REFRESH_LOCK_NAME, work) as Promise<T>)
    : work()

/**
 * Exchanges the stored refresh token. Inside the lock it first checks whether another tab already
 * rotated it, and only a 401 ends the session: being offline keeps you signed in.
 */
const performRefresh = (staleRefreshToken: string | null): Promise<string | null> =>
  withRefreshLock(async () => {
    const refreshToken = tokenStorage.getRefreshToken()
    if (!refreshToken) return null
    const accessToken = tokenStorage.getAccessToken()
    if (refreshToken !== staleRefreshToken && accessToken) return accessToken
    try {
      const response = await refreshClient.post<ApiSuccessBody<AuthTokens>>(AUTH_ENDPOINTS.REFRESH, { refreshToken })
      tokenStorage.setTokens(response.data.data)
      return response.data.data.accessToken
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === UNAUTHORIZED_STATUS) {
        tokenStorage.clear()
        emitSessionExpired()
        return null
      }
      throw error
    }
  })

/** Refreshes once for every caller in this tab at the same moment; resolves to the new access token or null. */
export const refreshAccessToken = (): Promise<string | null> => {
  pendingRefresh ??= performRefresh(tokenStorage.getRefreshToken()).finally(() => {
    pendingRefresh = null
  })
  return pendingRefresh
}

/** A usable access token, refreshed first when it is about to expire (sockets need one at handshake). */
export const getFreshAccessToken = async (): Promise<string | null> => {
  const accessToken = tokenStorage.getAccessToken()
  if (accessToken && !isTokenExpiring(accessToken, ACCESS_TOKEN_REFRESH_MARGIN_MS)) return accessToken
  return tokenStorage.hasSession() ? refreshAccessToken() : null
}
