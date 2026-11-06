import { HStack, Stack, Text } from '@chakra-ui/react'
import type { DropdownOptionRowProps } from '@/interfaces/components/common/dropdown/dropdown-option-row-props.interface'

/** Icon, label, and optional description: how every dropdown option looks. */
export function DropdownOptionRow({ option }: DropdownOptionRowProps) {
  return (
    <HStack gap="2.5" flex="1" minW="0">
      {option.icon}
      <Stack gap="0" minW="0">
        <Text truncate>{option.label}</Text>
        {option.description && (
          <Text fontSize="xs" color="fg.muted" truncate>
            {option.description}
          </Text>
        )}
      </Stack>
    </HStack>
  )
}
