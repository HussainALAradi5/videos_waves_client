export const PAGE_SIZES = {
  FEED: 12,
  COMMENTS: 10,
  ADMIN_REQUESTS: 10,
  MY_VIDEOS: 9,
  PEOPLE: 20
} as const

export const SEARCH_DEBOUNCE_MS = 400

export const BYTES_PER_MEGABYTE = 1024 * 1024
/** Mirrors the server default UPLOAD_MAX_VIDEO_MB; the server limit stays authoritative. */
export const MAX_VIDEO_UPLOAD_MB = 100

// Mirrors server validation limits so forms fail fast before a request is sent.
export const TEXT_LIMITS = {
  VIDEO_TITLE_MAX: 120,
  VIDEO_DESCRIPTION_MAX: 2000,
  COMMENT_MAX: 1000,
  ADMIN_REASON_MIN: 10,
  ADMIN_REASON_MAX: 500,
  ADMIN_NOTE_MAX: 500,
  BIO_MAX: 150
} as const

export const TOAST_DURATION_MS = 3000
