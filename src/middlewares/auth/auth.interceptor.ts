import axios, { type AxiosInstance } from 'axios'
import { apiConfig } from '@/config/api/api.config'
import { AUTH_ENDPOINTS } from '@/config/api/endpoints/auth.endpoints'
import type { ApiSuccessBody } from '@/interfaces/common/api/api-success-body.interface'
import type { AuthTokens } from '@/interfaces/users/auth/auth-tokens.interface'
import type { RetriableRequestConfig } from '@/interfaces/common/api/retriable-request-config.interface'
import { tokenStorage } from '@/services/storage/token-storage.service'
import { emitSessionExpired } from '@/utilities/auth/session-events.utility'

const UNAUTHORIZED_STATUS = 401

// A bare client without interceptors, so refreshing can never trigger another refresh.
const refreshClient = axios.create({ baseURL: apiConfig.baseURL, timeout: apiConfig.timeoutMs })

let pendingRefresh: Promise<string | null> | null = null

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = tokenStorage.getRefreshToken()
  if (!refreshToken) return null
  try {
    const response = await refreshClient.post<ApiSuccessBody<AuthTokens>>(AUTH_ENDPOINTS.REFRESH, { refreshToken })
    tokenStorage.setTokens(response.data.data)
    return response.data.data.accessToken
  } catch {
    return null
  }
}

/** Attaches the access token, and on a 401 refreshes once (shared by parallel requests) and retries. */
export const installAuthInterceptor = (client: AxiosInstance): void => {
  client.interceptors.request.use((config) => {
    const accessToken = tokenStorage.getAccessToken()
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })

  client.interceptors.response.use(undefined, async (error: unknown) => {
    const original = axios.isAxiosError(error) ? (error.config as RetriableRequestConfig | undefined) : undefined
    const isUnauthorized = axios.isAxiosError(error) && error.response?.status === UNAUTHORIZED_STATUS
    if (!isUnauthorized || !original || original.hasRetried || !tokenStorage.hasSession()) throw error

    original.hasRetried = true
    pendingRefresh ??= refreshAccessToken().finally(() => {
      pendingRefresh = null
    })
    const accessToken = await pendingRefresh
    if (!accessToken) {
      tokenStorage.clear()
      emitSessionExpired()
      throw error
    }
    original.headers.Authorization = `Bearer ${accessToken}`
    return client(original)
  })
}
