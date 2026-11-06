import { CHAT_ENDPOINTS } from '@/config/api/endpoints/chat.endpoints'
import type { CursorRequestDto } from '@/dtos/common/pagination/cursor-request.dto'
import type { SendMessageRequestDto } from '@/dtos/chat/message/send-message-request.dto'
import type { DeleteScope } from '@/enums/chat/message/delete-scope.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import { deleteData, getCursorPage, patchData, postData, putData } from '../../api/api-request'

export const messageService = {
  list: (conversationId: string, query: CursorRequestDto, signal?: AbortSignal) =>
    getCursorPage<Message>(CHAT_ENDPOINTS.messages(conversationId), query, signal),
  send: (conversationId: string, dto: SendMessageRequestDto) => postData<Message>(CHAT_ENDPOINTS.messages(conversationId), dto),
  edit: (conversationId: string, messageId: string, body: string) =>
    patchData<Message>(CHAT_ENDPOINTS.message(conversationId, messageId), { body }),
  remove: (conversationId: string, messageId: string, scope: DeleteScope) =>
    deleteData<{ messageId: string }>(CHAT_ENDPOINTS.message(conversationId, messageId), { params: { scope } }),
  react: (conversationId: string, messageId: string, emoji: string) =>
    putData<Message>(CHAT_ENDPOINTS.reaction(conversationId, messageId), { emoji }),
  unreact: (conversationId: string, messageId: string) => deleteData<Message>(CHAT_ENDPOINTS.reaction(conversationId, messageId))
}
