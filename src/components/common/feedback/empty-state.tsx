import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react'
import { LuWaves } from 'react-icons/lu'
import type { EmptyStateProps } from '@/interfaces/components/common/feedback/empty-state-props.interface'

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <ChakraEmptyState.Root>
      <ChakraEmptyState.Content>
        <ChakraEmptyState.Indicator>{icon ?? <LuWaves />}</ChakraEmptyState.Indicator>
        <VStack textAlign="center">
          <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
          {description && <ChakraEmptyState.Description>{description}</ChakraEmptyState.Description>}
        </VStack>
        {action}
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  )
}
