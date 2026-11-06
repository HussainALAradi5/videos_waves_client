'use client'

import { LuBan, LuBell, LuBellOff, LuImage, LuLogOut, LuTrash2 } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_OPTIONS_MESSAGES } from '@/constants/chat/chat-options.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'
import type { ChatOptionsProps } from '@/interfaces/components/chat/options/chat-options-props.interface'
import { useChatOptions } from '@/hooks/chat/conversation/use-chat-options'
import { ActionMenu } from '@/components/common/dropdown/action-menu'
import { ChatBackgroundDialog } from './chat-background-dialog'
import { ChatOptionsConfirm } from './chat-options-confirm'

/** The ⋯ menu (and right-click on an inbox row): mute, background, block, delete chat, and leave group. */
export function ChatOptionsMenu({ conversation, contextArea }: ChatOptionsProps) {
  const options = useChatOptions(conversation)
  return (
    <>
      <ActionMenu
        label={CHAT_OPTIONS_MESSAGES.MENU}
        size="sm"
        contextArea={contextArea}
        items={[
          { key: 'unmute', label: CHAT_OPTIONS_MESSAGES.UNMUTE, icon: <LuBell />, onSelect: () => void options.mute(MuteDuration.OFF), isHidden: !options.isMuted },
          {
            key: 'mute',
            label: CHAT_OPTIONS_MESSAGES.MUTE,
            icon: <LuBellOff />,
            isHidden: options.isMuted,
            children: [
              { key: 'mute-8h', label: CHAT_OPTIONS_MESSAGES.FOR_8H, onSelect: () => void options.mute(MuteDuration.EIGHT_HOURS) },
              { key: 'mute-1w', label: CHAT_OPTIONS_MESSAGES.FOR_1W, onSelect: () => void options.mute(MuteDuration.ONE_WEEK) },
              { key: 'mute-always', label: CHAT_OPTIONS_MESSAGES.UNTIL_UNMUTE, onSelect: () => void options.mute(MuteDuration.ALWAYS) }
            ]
          },
          { key: 'background', label: CHAT_MESSAGES.BACKGROUND, icon: <LuImage />, onSelect: options.requestBackground },
          { key: 'leave', label: CHAT_MESSAGES.LEAVE, icon: <LuLogOut />, onSelect: options.requestLeave, isDanger: true, isHidden: !options.isGroup },
          { key: 'block', label: SOCIAL_MESSAGES.BLOCK, icon: <LuBan />, onSelect: options.requestBlock, isDanger: true, isHidden: options.isGroup || !options.partnerName },
          { key: 'delete', label: CHAT_MESSAGES.DELETE_CHAT, icon: <LuTrash2 />, onSelect: options.requestDelete, isDanger: true }
        ]}
      />
      <ChatOptionsConfirm options={options} />
      <ChatBackgroundDialog options={options} />
    </>
  )
}
