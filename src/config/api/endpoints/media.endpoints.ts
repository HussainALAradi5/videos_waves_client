export const MEDIA_ENDPOINTS = {
  ROOT: '/media',
  SIGNATURE: '/media/signature',
  byId: (mediaId: string) => `/media/${encodeURIComponent(mediaId)}`
} as const
