const segment = (value: string): string => encodeURIComponent(value)

// Mirrors ROUTES.NOTIFICATIONS on the server.
export const NOTIFICATION_ENDPOINTS = {
  ROOT: '/notifications',
  UNREAD_COUNT: '/notifications/unread-count',
  READ_ALL: '/notifications/read-all',
  read: (id: string) => `/notifications/${segment(id)}/read`
} as const
