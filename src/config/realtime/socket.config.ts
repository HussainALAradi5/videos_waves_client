import { appConfig } from '../app/app.config'

export const socketConfig = {
  url: appConfig.apiBaseUrl,
  path: '/socket.io',
  reconnectionDelayMs: 1_000,
  reconnectionDelayMaxMs: 10_000
} as const
