import { Alert, Button } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { ErrorStateProps } from '@/interfaces/components/common/feedback/error-state-props.interface'
import { getErrorMessage } from '@/utilities/errors/api-error.utility'

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Alert.Root status="error" borderRadius="lg">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{getErrorMessage(error)}</Alert.Title>
      </Alert.Content>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          {MESSAGES.COMMON.RETRY}
        </Button>
      )}
    </Alert.Root>
  )
}
