import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/utilities/errors/api-error.utility'

const MAX_RETRIES = 2
const STALE_TIME_MS = 30_000

// Client errors (4xx) are final; only network and server failures are retried.
const shouldRetry = (failureCount: number, error: unknown): boolean =>
  failureCount < MAX_RETRIES && !(error instanceof ApiError && error.status < 500)

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: STALE_TIME_MS, retry: shouldRetry, refetchOnWindowFocus: false },
      mutations: { retry: false }
    }
  })
