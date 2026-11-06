import type { MessageKind } from '@/enums/chat/message/message-kind.enum'

export interface LastMessage {
  id: string
  senderId: string
  kind: MessageKind
  preview: string
  createdAt: string
}
