import type { IconButtonProps } from '@chakra-ui/react'
import type { ButtonTone } from '@/constants/common/button.constants'

export interface GenericIconButtonProps extends Omit<IconButtonProps, 'onClick' | 'variant' | 'colorPalette' | 'aria-label'> {
  /** Shown as the tooltip and used as the accessible name. */
  label: string
  tone?: ButtonTone
  onClick?: () => unknown
  isLoading?: boolean
}
