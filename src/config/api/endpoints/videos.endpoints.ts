const segment = (value: string): string => encodeURIComponent(value)

export const VIDEO_ENDPOINTS = {
  ROOT: '/videos',
  byId: (videoId: string) => `/videos/${segment(videoId)}`,
  views: (videoId: string) => `/videos/${segment(videoId)}/views`,
  like: (videoId: string) => `/videos/${segment(videoId)}/like`
} as const

export const COMMENT_ENDPOINTS = {
  root: (videoId: string) => `/videos/${segment(videoId)}/comments`,
  byId: (videoId: string, commentId: string) => `/videos/${segment(videoId)}/comments/${segment(commentId)}`
} as const
