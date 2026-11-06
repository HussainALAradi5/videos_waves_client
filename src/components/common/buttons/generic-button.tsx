'use client'

import { Button } from '@chakra-ui/react'
import { BUTTON_TONES } from '@/constants/common/button.constants'
import { PRESS } from '@/constants/common/motion.constants'
import type { GenericButtonProps } from '@/interfaces/components/common/buttons/generic-button-props.interface'
import { useAsyncAction } from '@/hooks/common/use-async-action'
import { MotionBox } from '../motion/motion-box'

/**
 * The app's one button. While its action runs (or `isLoading` is set) it shows a spinner, keeps
 * its width, and cannot be clicked again, so nothing is ever submitted twice.
 */
export function GenericButton(props: GenericButtonProps) {
  const { tone = 'primary', onClick, isLoading = false, loadingText, leftIcon, rightIcon, children, disabled, ...rest } = props
  const { run, isPending } = useAsyncAction(onClick)
  const isBusy = isLoading || isPending
  const style = BUTTON_TONES[tone]

  return (
    <MotionBox display="inline-flex" whileTap={isBusy || disabled ? undefined : PRESS.whileTap}>
      <Button
        variant={style.variant}
        colorPalette={style.colorPalette}
        bgImage={tone === 'gradient' ? '{gradients.brand}' : undefined}
        loading={isBusy}
        loadingText={loadingText}
        disabled={disabled || isBusy}
        aria-busy={isBusy}
        onClick={onClick ? () => void run() : undefined}
        rounded="full"
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </Button>
    </MotionBox>
  )
}
