'use client'

import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_OPTIONS_MESSAGES } from '@/constants/chat/chat-options.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { useChatOptions } from '@/hooks/chat/conversation/use-chat-options'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

/** The confirmation shown before deleting a chat, blocking the other person, or leaving a group. */
export function ChatOptionsConfirm({ options }: { options: ReturnType<typeof useChatOptions> }) {
  const isLeave = options.pending === 'leave'
  const isBlock = options.pending === 'block'
  const name = options.partnerName ?? ''
  return (
    <ConfirmDialog
      isOpen={options.pending === 'delete' || isLeave || isBlock}
      onClose={options.cancel}
      onConfirm={options.confirm}
      title={isBlock ? SOCIAL_MESSAGES.BLOCK_TITLE(name) : isLeave ? CHAT_OPTIONS_MESSAGES.LEAVE_TITLE(options.title) : CHAT_OPTIONS_MESSAGES.DELETE_TITLE(options.title)}
      description={isBlock ? SOCIAL_MESSAGES.BLOCK_DESCRIPTION : isLeave ? CHAT_OPTIONS_MESSAGES.LEAVE_BODY : CHAT_OPTIONS_MESSAGES.DELETE_BODY}
      confirmLabel={isBlock ? SOCIAL_MESSAGES.BLOCK : isLeave ? CHAT_MESSAGES.LEAVE : CHAT_MESSAGES.DELETE_CHAT}
    />
  )
}
