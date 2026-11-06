'use client'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { MUTE_OPTIONS } from '@/constants/chat/chat-options.constants'
import type { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'
import { useChatOptions } from '@/hooks/chat/conversation/use-chat-options'
import { muteSelection, muteStatusLabel } from '@/utilities/chat/mute.utility'
import { SelectDropdown } from '@/components/common/dropdown/select-dropdown'
import { ChatOptionsConfirm } from '../options/chat-options-confirm'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import { ConversationType } from '@/enums/chat/conversation/conversation-type.enum'
import type { GroupInfoSheetProps } from '@/interfaces/components/chat/dialogs/group-info-sheet-props.interface'
import { useConversationActions } from '@/hooks/chat/conversation/use-conversation-actions'
import { usePeoplePicker } from '@/hooks/chat/conversation/use-people-picker'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { BottomSheet } from '@/components/common/dialogs/bottom-sheet'
import { PeoplePicker } from './people-picker'
import { MemberRow } from './member-row'

/** Chat details: mute for a while or until unmuted, members (with admin controls), add people, leave, and delete. */
export function GroupInfoSheet({ conversation, isOpen, onClose }: GroupInfoSheetProps) {
  const actions = useConversationActions(conversation.id)
  const options = useChatOptions(conversation)
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
        <HStack justify="space-between" gap="4">
          <Stack gap="0">
            <Text fontWeight="semibold">{CHAT_MESSAGES.MUTE}</Text>
            {muteStatusLabel(conversation.me) && <Text fontSize="sm" color="fg.muted">{muteStatusLabel(conversation.me)}</Text>}
          </Stack>
          <SelectDropdown
            options={MUTE_OPTIONS}
            value={muteSelection(conversation.me)}
            placeholder={muteStatusLabel(conversation.me) ?? undefined}
            onChange={(value) => void options.mute(value as MuteDuration)}
            width="44"
          />
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
        <Stack gap="1">
          {isGroup && (
            <GenericButton tone="dangerGhost" onClick={options.requestLeave}>
              {CHAT_MESSAGES.LEAVE}
            </GenericButton>
          )}
          <GenericButton tone="dangerGhost" onClick={options.requestDelete}>
            {CHAT_MESSAGES.DELETE_CHAT}
          </GenericButton>
        </Stack>
        <ChatOptionsConfirm options={options} />
      </Stack>
    </BottomSheet>
  )
}
