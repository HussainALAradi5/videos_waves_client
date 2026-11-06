import { appConfig } from '../app/app.config'

export const apiConfig = {
  baseURL: appConfig.apiBaseUrl,
  timeoutMs: 15_000,
  uploadTimeoutMs: 10 * 60_000
} as const
