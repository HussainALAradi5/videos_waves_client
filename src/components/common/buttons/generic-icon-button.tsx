'use client'

import { IconButton, Tooltip, Portal } from '@chakra-ui/react'
import { BUTTON_TONES } from '@/constants/common/button.constants'
import type { GenericIconButtonProps } from '@/interfaces/components/common/buttons/generic-icon-button-props.interface'
import { useAsyncAction } from '@/hooks/common/use-async-action'

/** An icon-only GenericButton with a tooltip; busy while its action runs. */
export function GenericIconButton({ label, tone = 'ghost', onClick, isLoading = false, disabled, children, ...rest }: GenericIconButtonProps) {
  const { run, isPending } = useAsyncAction(onClick)
  const isBusy = isLoading || isPending
  const style = BUTTON_TONES[tone]

  return (
    <Tooltip.Root openDelay={400} closeDelay={0}>
      <Tooltip.Trigger asChild>
        <IconButton
          aria-label={label}
          variant={style.variant}
          colorPalette={style.colorPalette}
          loading={isBusy}
          disabled={disabled || isBusy}
          onClick={onClick ? (event) => void run(event) : undefined}
          rounded="full"
          {...rest}
        >
          {children}
        </IconButton>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>{label}</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  )
}
