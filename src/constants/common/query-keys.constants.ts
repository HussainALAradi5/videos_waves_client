import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'
import type { AdminRequestQueryDto } from '@/dtos/users/admin-request/admin-request-query.dto'
import type { AdminUsersQueryDto } from '@/dtos/users/admin-users/admin-users-query.dto'
import type { InboxFolder } from '@/enums/chat/conversation/inbox-folder.enum'

export const QUERY_KEYS = {
  me: ['users', 'me'] as const,
  adminUsersAll: ['admin', 'users'] as const,
  adminUsers: (query: AdminUsersQueryDto) => ['admin', 'users', query] as const,
  settings: ['users', 'me', 'settings'] as const,
  sessions: ['users', 'me', 'sessions'] as const,
  videos: ['videos'] as const,
  videoFeed: (query: VideoQueryDto) => ['videos', 'feed', query] as const,
  video: (videoId: string) => ['videos', 'detail', videoId] as const,
  // Kept outside the 'videos' prefix so video cache patches never touch comment pages.
  comments: (videoId: string) => ['comments', videoId] as const,
  replies: (videoId: string, commentId: string) => ['comments', videoId, 'replies', commentId] as const,
  people: ['people'] as const,
  profile: (userName: string) => ['people', 'profile', userName] as const,
  followers: (userName: string) => ['people', 'followers', userName] as const,
  following: (userName: string) => ['people', 'following', userName] as const,
  userSearch: (search: string) => ['people', 'search', search] as const,
  blocked: ['people', 'blocked'] as const,
  restricted: ['people', 'restricted'] as const,
  chat: ['chat'] as const,
  conversations: ['chat', 'conversations'] as const,
  conversationList: (folder: InboxFolder, search: string) => ['chat', 'conversations', folder, search] as const,
  conversation: (conversationId: string) => ['chat', 'conversation', conversationId] as const,
  messages: (conversationId: string) => ['chat', 'messages', conversationId] as const,
  typing: (conversationId: string) => ['chat', 'typing', conversationId] as const,
  unread: ['chat', 'unread'] as const,
  adminRequests: ['admin-requests'] as const,
  adminRequestPage: (query: AdminRequestQueryDto) => ['admin-requests', query] as const
}
