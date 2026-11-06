import { Badge } from '@chakra-ui/react'
import type { StatusBadgeProps } from '@/interfaces/components/common/badges/status-badge-props.interface'

/** Renders any enum value with the label and color from its option map. */
export function StatusBadge<TValue extends string>({ value, options }: StatusBadgeProps<TValue>) {
  const option = options[value]
  return (
    <Badge colorPalette={option.colorPalette} variant="subtle">
      {option.label}
    </Badge>
  )
}
