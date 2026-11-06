'use client'

import { HStack, Stack, Switch, Text } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import { ConversationType } from '@/enums/chat/conversation/conversation-type.enum'
import type { GroupInfoSheetProps } from '@/interfaces/components/chat/dialogs/group-info-sheet-props.interface'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useConversationActions } from '@/hooks/chat/conversation/use-conversation-actions'
import { usePeoplePicker } from '@/hooks/chat/conversation/use-people-picker'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { BottomSheet } from '@/components/common/dialogs/bottom-sheet'
import { PeoplePicker } from './people-picker'
import { MemberRow } from './member-row'

/** Chat details: mute, members (with admin controls), add people, and leave or delete. */
export function GroupInfoSheet({ conversation, isOpen, onClose }: GroupInfoSheetProps) {
  const { user } = useAuth()
  const actions = useConversationActions(conversation.id)
  const picker = usePeoplePicker()
  const isGroup = conversation.type === ConversationType.GROUP
  const isAdmin = conversation.me.role === MemberRole.ADMIN

  const addPeople = async () => {
    await actions.addMembers(picker.selected.map((option) => option.value))
    picker.reset()
  }
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={CHAT_MESSAGES.CHAT_INFO}>
      <Stack gap="6">
        <HStack justify="space-between">
          <Text fontWeight="semibold">{CHAT_MESSAGES.MUTE}</Text>
          <Switch.Root checked={conversation.me.isMuted} onCheckedChange={(details) => void actions.setMuted(details.checked)} colorPalette="brand">
            <Switch.HiddenInput aria-label={CHAT_MESSAGES.MUTE} />
            <Switch.Control />
          </Switch.Root>
        </HStack>
        {isGroup && (
          <Stack gap="2">
            <Text fontWeight="semibold">{CHAT_MESSAGES.MEMBERS(conversation.membersCount)}</Text>
            {conversation.members.map((member) => (
              <MemberRow key={member.user.id} member={member} canManage={isAdmin} onRemove={() => actions.removeMember(member.user.id)} onSetRole={(role) => actions.setRole(member.user.id, role)} />
            ))}
          </Stack>
        )}
        {isGroup && isAdmin && (
          <Stack gap="2">
            <PeoplePicker picker={picker} />
            <GenericButton tone="secondary" onClick={addPeople} disabled={picker.selected.length === 0}>
              {CHAT_MESSAGES.ADD_PEOPLE}
            </GenericButton>
          </Stack>
        )}
        <GenericButton tone="dangerGhost" onClick={isGroup && user ? () => actions.leave(user.id) : actions.hide}>
          {isGroup ? CHAT_MESSAGES.LEAVE : CHAT_MESSAGES.DELETE_CHAT}
        </GenericButton>
      </Stack>
    </BottomSheet>
  )
}
