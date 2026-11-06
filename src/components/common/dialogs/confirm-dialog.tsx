'use client'

import { Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { ConfirmDialogProps } from '@/interfaces/components/common/dialogs/confirm-dialog-props.interface'
import { GenericButton } from '../buttons/generic-button'
import { GenericModal } from './generic-modal'

/** Asks before a destructive action; the confirm button shows a spinner until the action finishes. */
export function ConfirmDialog(props: ConfirmDialogProps) {
  const { isOpen, title, description, confirmLabel, onConfirm, onClose, isLoading, children } = props
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <GenericButton tone="ghost" onClick={onClose} disabled={isLoading}>
            {MESSAGES.COMMON.CANCEL}
          </GenericButton>
          <GenericButton tone="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </GenericButton>
        </>
      }
    >
      {children}
      <Text color="fg.muted">{description}</Text>
    </GenericModal>
  )
}
