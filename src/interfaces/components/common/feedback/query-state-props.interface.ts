import type { ReactNode } from 'react'

/** Chooses between loading, error, empty, and content for any query-backed section. */
export interface QueryStateProps {
  isLoading: boolean
  error: unknown
  isEmpty?: boolean
  empty?: ReactNode
  onRetry?: () => void
  children: ReactNode
}
