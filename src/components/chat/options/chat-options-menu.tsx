'use client'

import { LuBell, LuBellOff, LuLogOut, LuTrash2 } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_OPTIONS_MESSAGES } from '@/constants/chat/chat-options.constants'
import { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'
import type { ChatOptionsProps } from '@/interfaces/components/chat/options/chat-options-props.interface'
import { useChatOptions } from '@/hooks/chat/conversation/use-chat-options'
import { ActionMenu } from '@/components/common/dropdown/action-menu'
import { ChatOptionsConfirm } from './chat-options-confirm'

/** The ⋯ menu on an inbox row and in the chat header: mute, delete chat, and leave group. */
export function ChatOptionsMenu({ conversation }: ChatOptionsProps) {
  const options = useChatOptions(conversation)
  return (
    <>
      <ActionMenu
        label={CHAT_OPTIONS_MESSAGES.MENU}
        size="sm"
        items={[
          { key: 'unmute', label: CHAT_OPTIONS_MESSAGES.UNMUTE, icon: <LuBell />, onSelect: () => void options.mute(MuteDuration.OFF), isHidden: !options.isMuted },
          { key: 'mute-8h', label: CHAT_OPTIONS_MESSAGES.MUTE_8H, icon: <LuBellOff />, onSelect: () => void options.mute(MuteDuration.EIGHT_HOURS), isHidden: options.isMuted },
          { key: 'mute-1w', label: CHAT_OPTIONS_MESSAGES.MUTE_1W, icon: <LuBellOff />, onSelect: () => void options.mute(MuteDuration.ONE_WEEK), isHidden: options.isMuted },
          { key: 'mute-always', label: CHAT_OPTIONS_MESSAGES.MUTE_ALWAYS, icon: <LuBellOff />, onSelect: () => void options.mute(MuteDuration.ALWAYS), isHidden: options.isMuted },
          { key: 'leave', label: CHAT_MESSAGES.LEAVE, icon: <LuLogOut />, onSelect: options.requestLeave, isDanger: true, isHidden: !options.isGroup },
          { key: 'delete', label: CHAT_MESSAGES.DELETE_CHAT, icon: <LuTrash2 />, onSelect: options.requestDelete, isDanger: true }
        ]}
      />
      <ChatOptionsConfirm options={options} />
    </>
  )
}
