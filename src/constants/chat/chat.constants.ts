/** Mirror the server rules so the composer fails fast; the server stays authoritative. */
export const CHAT_LIMITS = {
  BODY_MAX: 2000,
  MAX_ATTACHMENTS: 10,
  ATTACHMENT_MAX_MB: 25,
  EDIT_WINDOW_MS: 15 * 60 * 1000,
  VOICE_MAX_SECONDS: 300,
  GROUP_MAX_MEMBERS: 32,
  TITLE_MAX: 60
} as const

export const CHAT_PAGE_SIZES = { INBOX: 20, MESSAGES: 30 } as const

/** Messages closer than this from the same sender share one bubble group. */
export const MESSAGE_GROUP_WINDOW_MS = 5 * 60 * 1000

export const CHAT_ATTACHMENT_ACCEPT = {
  'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov'],
  'application/pdf': ['.pdf']
}

export const REACTION_EMOJIS = ['❤️', '😂', '😮', '😢', '😡', '👍', '🔥', '👏'] as const

export const VOICE_MIME_TYPE = 'audio/webm'
