import type { QueryStateProps } from '@/interfaces/components/common/feedback/query-state-props.interface'
import { LoadingState } from './loading-state'
import { ErrorState } from './error-state'

export function QueryState({ isLoading, error, isEmpty = false, empty, onRetry, children }: QueryStateProps) {
  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} onRetry={onRetry} />
  if (isEmpty) return <>{empty}</>
  return <>{children}</>
}
