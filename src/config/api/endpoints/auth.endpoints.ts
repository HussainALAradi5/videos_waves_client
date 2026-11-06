// Mirrors the server routes in constants/common/routes.constants.ts (server repository).
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout'
} as const
