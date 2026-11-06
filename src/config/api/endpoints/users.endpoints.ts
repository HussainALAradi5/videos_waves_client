const segment = (value: string): string => encodeURIComponent(value)

// Mirrors the server routes in constants/common/routes.constants.ts (server repository).
export const USER_ENDPOINTS = {
  ROOT: '/users',
  ME: '/users/me',
  ME_PASSWORD: '/users/me/password',
  ME_AVATAR: '/users/me/avatar',
  ME_SETTINGS: '/users/me/settings',
  ME_BLOCKED: '/users/me/blocked',
  ME_RESTRICTED: '/users/me/restricted',
  ME_FOLLOW_REQUESTS: '/users/me/follow-requests',
  SEARCH: '/users/search',
  EXPORT: '/users/export',
  IMPORT: '/users/import',
  profile: (userName: string) => `/users/${segment(userName)}`,
  follow: (userName: string) => `/users/${segment(userName)}/follow`,
  followers: (userName: string) => `/users/${segment(userName)}/followers`,
  following: (userName: string) => `/users/${segment(userName)}/following`,
  block: (userName: string) => `/users/${segment(userName)}/block`,
  restrict: (userName: string) => `/users/${segment(userName)}/restrict`,
  status: (userName: string) => `/users/${segment(userName)}/status`,
  followRequest: (userName: string) => `/users/me/follow-requests/${segment(userName)}`
} as const
