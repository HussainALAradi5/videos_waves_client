'use client'

import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CHAT_LIMITS } from '@/constants/chat/chat.constants'
import { MediaKind } from '@/enums/media/media/media-kind.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import { mediaUploadService } from '@/services/media/media/media-upload.service'
import { messageService } from '@/services/chat/message/message.service'
import { chatCache } from '@/utilities/cache/chat-cache.utility'
import { notifyError } from '@/utilities/toast/notify.utility'
import { useMultiFileQueue } from '@/hooks/common/use-multi-file-queue'
import { useTypingSignal } from './use-typing-signal'

/** Text, a reply target, several attachments, and voice notes; sends straight into the thread cache. */
export const useChatComposer = (conversationId: string, sharedVideoId: string | null, onVideoShared: () => void) => {
  const queryClient = useQueryClient()
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const attachments = useMultiFileQueue({ kind: MediaKind.CHAT_ATTACHMENT, maxFiles: CHAT_LIMITS.MAX_ATTACHMENTS })
  const typing = useTypingSignal(conversationId)
  const canSend = text.trim().length > 0 || attachments.items.length > 0 || sharedVideoId !== null

  const changeText = (value: string) => {
    setText(value)
    typing.onTextChange(value)
  }
  const deliver = async (body: Parameters<typeof messageService.send>[1]) => {
    chatCache.upsertMessage(queryClient, await messageService.send(conversationId, { ...body, replyToId: replyTo?.id }))
    setReplyTo(null)
  }
  const send = async () => {
    if (!canSend) return
    try {
      const uploaded = attachments.items.length > 0 ? await attachments.uploadAll() : []
      await deliver({
        body: text.trim() || undefined,
        attachmentIds: uploaded.length > 0 ? uploaded.map((media) => media.id) : undefined,
        sharedVideoId: sharedVideoId ?? undefined
      })
      if (sharedVideoId) onVideoShared()
      setText('')
      attachments.clear()
      typing.stop()
    } catch (error) {
      notifyError(error)
    }
  }
  const sendVoiceNote = useCallback(
    async (file: File) => {
      try {
        const media = await mediaUploadService.upload(file, MediaKind.VOICE_NOTE, () => undefined)
        chatCache.upsertMessage(queryClient, await messageService.send(conversationId, { voiceNoteId: media.id }))
      } catch (error) {
        notifyError(error)
      }
    },
    [conversationId, queryClient]
  )
  return { text, changeText, replyTo, setReplyTo, attachments, canSend, send, sendVoiceNote }
}
