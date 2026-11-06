'use client'

import { CloseButton, Dialog, Portal } from '@chakra-ui/react'
import type { GenericModalProps } from '@/interfaces/components/common/dialogs/generic-modal-props.interface'

/** Centered dialog with a scale-in animation; every app modal uses it. */
export function GenericModal({ isOpen, onClose, title, description, footer, size = 'md', children }: GenericModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
      size={size}
      placement="center"
      motionPreset="scale"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(6px)" />
        <Dialog.Positioner px="4">
          <Dialog.Content rounded="2xl" bg="app.surfaceRaised">
            <Dialog.Header flexDirection="column" alignItems="flex-start" gap="1">
              <Dialog.Title>{title}</Dialog.Title>
              {description && <Dialog.Description color="fg.muted">{description}</Dialog.Description>}
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            {footer && <Dialog.Footer>{footer}</Dialog.Footer>}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
