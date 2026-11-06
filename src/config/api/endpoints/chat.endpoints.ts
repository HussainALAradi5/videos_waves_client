const segment = (value: string): string => encodeURIComponent(value)
const conversation = (id: string) => `/chat/conversations/${segment(id)}`

export const CHAT_ENDPOINTS = {
  UNREAD: '/chat/unread-count',
  CONVERSATIONS: '/chat/conversations',
  GROUPS: '/chat/groups',
  conversation,
  accept: (id: string) => `${conversation(id)}/accept`,
  read: (id: string) => `${conversation(id)}/read`,
  members: (id: string) => `${conversation(id)}/members`,
  member: (id: string, userId: string) => `${conversation(id)}/members/${segment(userId)}`,
  messages: (id: string) => `${conversation(id)}/messages`,
  message: (id: string, messageId: string) => `${conversation(id)}/messages/${segment(messageId)}`,
  reaction: (id: string, messageId: string) => `${conversation(id)}/messages/${segment(messageId)}/reaction`
} as const
