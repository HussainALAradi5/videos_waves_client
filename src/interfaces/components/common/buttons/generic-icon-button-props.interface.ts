import type { MouseEvent } from 'react'
import type { IconButtonProps } from '@chakra-ui/react'
import type { ButtonTone } from '@/constants/common/button.constants'

export interface GenericIconButtonProps extends Omit<IconButtonProps, 'onClick' | 'variant' | 'colorPalette' | 'aria-label'> {
  /** Shown as the tooltip and used as the accessible name. */
  label: string
  tone?: ButtonTone
  /** Receives the click event, which menus and popovers that wrap the button need. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown
  isLoading?: boolean
}
