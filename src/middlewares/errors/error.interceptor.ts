import type { AxiosInstance } from 'axios'
import { toApiError } from '@/utilities/errors/api-error.utility'

/** Converts every failed response into an ApiError so callers handle one error type. */
export const installErrorInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(undefined, (error: unknown) => {
    throw toApiError(error)
  })
}
