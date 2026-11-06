'use client'

import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import type { ConfirmDialogProps } from '@/interfaces/components/common/dialogs/confirm-dialog-props.interface'

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { isOpen, title, description, confirmLabel, onConfirm, onClose, isLoading, colorPalette = PALETTES.DANGER } = props

  return (
    <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && onClose()} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text color="fg.muted">{description}</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                {MESSAGES.COMMON.CANCEL}
              </Button>
              <Button colorPalette={colorPalette} onClick={onConfirm} loading={isLoading}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
