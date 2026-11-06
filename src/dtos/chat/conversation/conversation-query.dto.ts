import type { InboxFolder } from '@/enums/chat/conversation/inbox-folder.enum'

export interface ConversationQueryDto {
  folder: InboxFolder
  search?: string
  page: number
  pageSize: number
}
