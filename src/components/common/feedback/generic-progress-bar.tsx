import { HStack, Progress, Text } from '@chakra-ui/react'
import type { GenericProgressBarProps } from '@/interfaces/components/common/feedback/generic-progress-bar-props.interface'

/** Brand-gradient progress bar for uploads and long tasks; indeterminate without a value. */
export function GenericProgressBar({ value, label, size = 'sm', showValue = false }: GenericProgressBarProps) {
  return (
    <Progress.Root value={value ?? null} size={size} width="full" colorPalette="brand">
      {(label || showValue) && (
        <HStack justify="space-between" mb="1">
          {label && <Progress.Label fontSize="sm">{label}</Progress.Label>}
          {showValue && value !== undefined && (
            <Text fontSize="xs" color="fg.muted">
              {value}%
            </Text>
          )}
        </HStack>
      )}
      <Progress.Track rounded="full" bg="brand.subtle">
        <Progress.Range rounded="full" bgImage="{gradients.brand}" transition="width 0.25s ease" />
      </Progress.Track>
    </Progress.Root>
  )
}
