'use client'

import { useState } from 'react'
import { CHAT_OPTIONS_MESSAGES } from '@/constants/chat/chat-options.constants'
import { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'
import { ConversationType } from '@/enums/chat/conversation/conversation-type.enum'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { conversationTitle } from '@/utilities/chat/conversation-display.utility'
import { notifySuccess } from '@/utilities/toast/notify.utility'
import { useConversationActions } from './use-conversation-actions'

type PendingAction = 'delete' | 'leave' | null

/** Mute, delete chat, and leave group for one conversation, with a confirmation before the last two. */
export const useChatOptions = (conversation: Conversation) => {
  const { user } = useAuth()
  const actions = useConversationActions(conversation.id)
  const [pending, setPending] = useState<PendingAction>(null)
  const title = conversationTitle(conversation)

  const mute = async (duration: MuteDuration) => {
    await actions.setMute(duration)
    notifySuccess(duration === MuteDuration.OFF ? CHAT_OPTIONS_MESSAGES.UNMUTED : CHAT_OPTIONS_MESSAGES.MUTED)
  }
  const confirm = async () => {
    if (pending === 'delete') {
      await actions.hide()
      notifySuccess(CHAT_OPTIONS_MESSAGES.DELETED)
    } else if (pending === 'leave' && user) {
      await actions.leave(user.id)
      notifySuccess(CHAT_OPTIONS_MESSAGES.LEFT(title))
    }
    setPending(null)
  }
  return {
    title,
    isGroup: conversation.type === ConversationType.GROUP,
    isMuted: conversation.me.isMuted,
    mute,
    pending,
    requestDelete: () => setPending('delete'),
    requestLeave: () => setPending('leave'),
    cancel: () => setPending(null),
    confirm
  }
}
