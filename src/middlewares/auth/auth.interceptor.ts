import axios, { type AxiosInstance } from 'axios'
import { UNAUTHORIZED_STATUS } from '@/constants/users/auth/auth.constants'
import type { RetriableRequestConfig } from '@/interfaces/common/api/retriable-request-config.interface'
import { tokenStorage } from '@/services/storage/token-storage.service'
import { getFreshAccessToken, refreshAccessToken } from '@/services/users/auth/token-refresh.service'

/**
 * Attaches a fresh access token (refreshing just before expiry), and on a 401 refreshes once and
 * retries. Refreshes are shared by parallel requests and serialised across tabs.
 */
export const installAuthInterceptor = (client: AxiosInstance): void => {
  client.interceptors.request.use(async (config) => {
    const accessToken = tokenStorage.hasSession() ? await getFreshAccessToken() : null
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })

  client.interceptors.response.use(undefined, async (error: unknown) => {
    const original = axios.isAxiosError(error) ? (error.config as RetriableRequestConfig | undefined) : undefined
    const isUnauthorized = axios.isAxiosError(error) && error.response?.status === UNAUTHORIZED_STATUS
    if (!isUnauthorized || !original || original.hasRetried || !tokenStorage.hasSession()) throw error

    original.hasRetried = true
    const accessToken = await refreshAccessToken()
    if (!accessToken) throw error
    original.headers.Authorization = `Bearer ${accessToken}`
    return client(original)
  })
}
