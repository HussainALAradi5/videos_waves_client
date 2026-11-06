import type { InternalAxiosRequestConfig } from 'axios'

export interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  /** Set after one refresh-and-retry so a request is never retried twice. */
  hasRetried?: boolean
}
