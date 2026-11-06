const DEFAULT_API_BASE_URL = 'http://localhost:5000'

export const appConfig = {
  name: 'Videos Waves',
  description: 'Share short videos, like them, and talk about them.',
  apiBaseUrl: (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '')
} as const
