import type { MouseEvent } from 'react'
import type { ButtonProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { ButtonTone } from '@/constants/common/button.constants'

export interface GenericButtonProps extends Omit<ButtonProps, 'onClick' | 'variant' | 'colorPalette'> {
  tone?: ButtonTone
  /** May return a promise: the button shows a spinner and ignores clicks until it settles. Receives the click event, which menus and popovers that wrap the button need. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown
  /** Set by callers that track the pending state themselves (for example a form submit). */
  isLoading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}
