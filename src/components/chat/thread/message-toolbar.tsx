'use client'

import { HStack } from '@chakra-ui/react'
import { LuCopy, LuPencil, LuReply, LuTrash2, LuUndo2 } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import type { MessageToolbarProps } from '@/interfaces/components/chat/thread/message-toolbar-props.interface'
import { isWithinEditWindow } from '@/utilities/chat/edit-window.utility'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { ActionMenu } from '@/components/common/dropdown/action-menu'
import { ReactionPicker } from './reaction-picker'

/** React, reply, and a menu (copy, edit within 15 minutes, unsend, delete for you); shown on hover or focus. */
export function MessageToolbar({ message, isMine, actions, onReply, onEdit }: MessageToolbarProps) {
  const canEdit = isMine && message.kind === MessageKind.TEXT && Boolean(message.body) && isWithinEditWindow(message.createdAt)
  return (
    <HStack gap="0" opacity={{ base: 1, md: 0 }} _groupHover={{ opacity: 1 }} _focusWithin={{ opacity: 1 }} transition="opacity 0.15s">
      <ReactionPicker myReaction={message.myReaction} onReact={actions.react} />
      <GenericIconButton label={CHAT_MESSAGES.REPLY} size="xs" onClick={onReply}>
        <LuReply />
      </GenericIconButton>
      <ActionMenu
        label={CHAT_MESSAGES.MESSAGE_OPTIONS}
        size="xs"
        items={[
          { key: 'copy', label: CHAT_MESSAGES.COPY, icon: <LuCopy />, onSelect: actions.copy, isHidden: !message.body },
          { key: 'edit', label: CHAT_MESSAGES.EDIT, icon: <LuPencil />, onSelect: onEdit, isHidden: !canEdit },
          { key: 'unsend', label: CHAT_MESSAGES.UNSEND, icon: <LuUndo2 />, onSelect: () => void actions.unsend(), isHidden: !isMine, isDanger: true },
          { key: 'delete', label: CHAT_MESSAGES.DELETE_FOR_ME, icon: <LuTrash2 />, onSelect: () => void actions.deleteForMe(), isDanger: true }
        ]}
      />
    </HStack>
  )
}
