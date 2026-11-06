import type { MessageKind } from '@/enums/chat/message/message-kind.enum'
import type { SystemAction } from '@/enums/chat/message/system-action.enum'
import type { Media } from '@/interfaces/media/media/media.interface'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'
import type { MessageReply } from './message-reply.interface'
import type { ReactionCount } from './reaction-count.interface'
import type { SharedVideo } from './shared-video.interface'

export interface Message {
  id: string
  conversationId: string
  sender: PublicUser
  kind: MessageKind
  body: string | null
  attachments: Media[]
  replyTo: MessageReply | null
  sharedVideo: SharedVideo | null
  systemAction: SystemAction | null
  systemTarget: PublicUser | null
  reactions: ReactionCount[]
  myReaction: string | null
  isEdited: boolean
  isUnsent: boolean
  createdAt: string
}
