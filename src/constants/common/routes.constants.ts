export const PAGE_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UPLOAD: '/upload',
  PROFILE: '/profile',
  ADMIN_REQUESTS: '/admin/requests',
  video: (videoId: string) => `/videos/${encodeURIComponent(videoId)}`
} as const

export const REDIRECT_QUERY_PARAM = 'redirect'
