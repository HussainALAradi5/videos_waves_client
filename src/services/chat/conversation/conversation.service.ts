import { CHAT_ENDPOINTS } from '@/config/api/endpoints/chat.endpoints'
import type { ConversationQueryDto } from '@/dtos/chat/conversation/conversation-query.dto'
import type { CreateGroupRequestDto } from '@/dtos/chat/conversation/create-group-request.dto'
import type { UpdateConversationRequestDto } from '@/dtos/chat/conversation/update-conversation-request.dto'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'
import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import { deleteData, getData, getPage, patchData, postData } from '../../api/api-request'

export const conversationService = {
  list: (query: ConversationQueryDto, signal?: AbortSignal) => getPage<Conversation>(CHAT_ENDPOINTS.CONVERSATIONS, query, signal),
  get: (id: string, signal?: AbortSignal) => getData<Conversation>(CHAT_ENDPOINTS.conversation(id), { signal }),
  unreadCount: () => getData<{ unreadCount: number }>(CHAT_ENDPOINTS.UNREAD),
  startDirect: (userName: string) => postData<Conversation>(CHAT_ENDPOINTS.CONVERSATIONS, { userName }),
  createGroup: (dto: CreateGroupRequestDto) => postData<Conversation>(CHAT_ENDPOINTS.GROUPS, dto),
  update: (id: string, dto: UpdateConversationRequestDto) => patchData<Conversation>(CHAT_ENDPOINTS.conversation(id), dto),
  /** Delete the chat for me (or decline a request). */
  hide: (id: string) => deleteData<{ message: string }>(CHAT_ENDPOINTS.conversation(id)),
  accept: (id: string) => postData<Conversation>(CHAT_ENDPOINTS.accept(id)),
  markRead: (id: string) => postData<{ conversationId: string }>(CHAT_ENDPOINTS.read(id)),
  addMembers: (id: string, userNames: string[]) => postData<Conversation>(CHAT_ENDPOINTS.members(id), { userNames }),
  removeMember: (id: string, userId: string) => deleteData<{ userId: string }>(CHAT_ENDPOINTS.member(id, userId)),
  setRole: (id: string, userId: string, role: MemberRole) => patchData<Conversation>(CHAT_ENDPOINTS.member(id, userId), { role })
}
