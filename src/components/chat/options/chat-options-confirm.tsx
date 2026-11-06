'use client'

import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_OPTIONS_MESSAGES } from '@/constants/chat/chat-options.constants'
import type { useChatOptions } from '@/hooks/chat/conversation/use-chat-options'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

/** The confirmation shown before deleting a chat or leaving a group. */
export function ChatOptionsConfirm({ options }: { options: ReturnType<typeof useChatOptions> }) {
  const isLeave = options.pending === 'leave'
  return (
    <ConfirmDialog
      isOpen={options.pending !== null}
      onClose={options.cancel}
      onConfirm={options.confirm}
      title={isLeave ? CHAT_OPTIONS_MESSAGES.LEAVE_TITLE(options.title) : CHAT_OPTIONS_MESSAGES.DELETE_TITLE(options.title)}
      description={isLeave ? CHAT_OPTIONS_MESSAGES.LEAVE_BODY : CHAT_OPTIONS_MESSAGES.DELETE_BODY}
      confirmLabel={isLeave ? CHAT_MESSAGES.LEAVE : CHAT_MESSAGES.DELETE_CHAT}
    />
  )
}
