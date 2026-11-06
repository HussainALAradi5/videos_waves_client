/** Refresh a little before expiry so a request never leaves with a token that dies on the way. */
export const ACCESS_TOKEN_REFRESH_MARGIN_MS = 60 * 1000
/** Web Locks name that serialises refreshes across every open tab. */
export const REFRESH_LOCK_NAME = 'videos-waves.refresh'
export const UNAUTHORIZED_STATUS = 401
