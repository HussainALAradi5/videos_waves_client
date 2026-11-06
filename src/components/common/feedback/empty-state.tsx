import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react'
import { LuWaves } from 'react-icons/lu'
import type { EmptyStateProps } from '@/interfaces/components/common/feedback/empty-state-props.interface'
import { Animated } from '../motion/animated'

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Animated variant="fadeUp">
      <ChakraEmptyState.Root>
        <ChakraEmptyState.Content>
          <ChakraEmptyState.Indicator color="brand.fg" animation="waveBob 2.4s ease-in-out infinite">
            {icon ?? <LuWaves />}
          </ChakraEmptyState.Indicator>
          <VStack textAlign="center">
            <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
            {description && <ChakraEmptyState.Description>{description}</ChakraEmptyState.Description>}
          </VStack>
          {action}
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    </Animated>
  )
}
