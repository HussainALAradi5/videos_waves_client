'use client'

import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import type { FieldValues } from 'react-hook-form'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { FormDialogProps } from '@/interfaces/components/common/dialogs/form-dialog-props.interface'
import { GenericForm } from '../forms/generic-form'

/** A GenericForm inside a dialog; used for edit-profile, change-password, and edit-video. */
export function FormDialog<TValues extends FieldValues>({ isOpen, title, onClose, ...formProps }: FormDialogProps<TValues>) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && onClose()} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="6">
              <GenericForm
                {...formProps}
                secondaryAction={
                  <Button variant="outline" onClick={onClose}>
                    {MESSAGES.COMMON.CANCEL}
                  </Button>
                }
              />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
