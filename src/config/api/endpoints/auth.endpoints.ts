// Mirrors the server routes in constants/common/routes.constants.ts (server repository).
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  LOGOUT_ALL: '/auth/logout-all',
  SESSIONS: '/auth/sessions',
  session: (sessionId: string) => `/auth/sessions/${encodeURIComponent(sessionId)}`
} as const
