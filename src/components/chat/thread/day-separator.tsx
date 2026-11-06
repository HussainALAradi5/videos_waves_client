import { HStack, Separator, Text } from '@chakra-ui/react'
import type { DaySeparatorProps } from '@/interfaces/components/chat/thread/day-separator-props.interface'

export function DaySeparator({ label }: DaySeparatorProps) {
  return (
    <HStack gap="3" py="2">
      <Separator flex="1" borderColor="app.border" />
      <Text fontSize="xs" color="fg.muted" fontWeight="semibold">
        {label}
      </Text>
      <Separator flex="1" borderColor="app.border" />
    </HStack>
  )
}
