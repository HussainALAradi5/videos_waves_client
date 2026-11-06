const segment = (value: string): string => encodeURIComponent(value)

export const PAGE_ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  LOGIN: '/login',
  REGISTER: '/register',
  UPLOAD: '/upload',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
  ADMIN_REQUESTS: '/admin/requests',
  ADMIN_USERS: '/admin/users',
  video: (videoId: string) => `/videos/${segment(videoId)}`,
  profile: (userName: string) => `/u/${segment(userName)}`,
  conversation: (conversationId: string) => `/messages/${segment(conversationId)}`
} as const

export const REDIRECT_QUERY_PARAM = 'redirect'
