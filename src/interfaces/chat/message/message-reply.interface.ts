import type { MessageKind } from '@/enums/chat/message/message-kind.enum'

export interface MessageReply {
  id: string
  senderUserName: string
  kind: MessageKind
  preview: string
}
