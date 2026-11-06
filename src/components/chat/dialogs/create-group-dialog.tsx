'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field, Input, Stack } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_LIMITS } from '@/constants/chat/chat.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { ChatDialogProps } from '@/interfaces/components/chat/dialogs/chat-dialog-props.interface'
import { usePeoplePicker } from '@/hooks/chat/conversation/use-people-picker'
import { conversationService } from '@/services/chat/conversation/conversation.service'
import { notifyError } from '@/utilities/toast/notify.utility'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericModal } from '@/components/common/dialogs/generic-modal'
import { PeoplePicker } from './people-picker'

const MIN_INVITEES = 2

/** Name the group and pick at least two people from search. */
export function CreateGroupDialog({ isOpen, onClose }: ChatDialogProps) {
  const [title, setTitle] = useState('')
  const picker = usePeoplePicker()
  const router = useRouter()
  const canCreate = title.trim().length > 0 && picker.selected.length >= MIN_INVITEES

  const create = async () => {
    try {
      const group = await conversationService.createGroup({ title: title.trim(), userNames: picker.selected.map((option) => option.value) })
      setTitle('')
      picker.reset()
      onClose()
      router.push(PAGE_ROUTES.conversation(group.id))
    } catch (error) {
      notifyError(error)
    }
  }
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={CHAT_MESSAGES.NEW_GROUP}
      footer={<GenericButton tone="gradient" onClick={create} disabled={!canCreate}>{CHAT_MESSAGES.CREATE}</GenericButton>}
    >
      <Stack gap="4">
        <Field.Root required>
          <Field.Label>{CHAT_MESSAGES.GROUP_NAME}</Field.Label>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={CHAT_LIMITS.TITLE_MAX} rounded="xl" />
        </Field.Root>
        <PeoplePicker picker={picker} maxSelected={CHAT_LIMITS.GROUP_MAX_MEMBERS - 1} />
      </Stack>
    </GenericModal>
  )
}
