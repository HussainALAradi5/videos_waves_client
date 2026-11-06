import { PAGE_ROUTES, REDIRECT_QUERY_PARAM } from '@/constants/common/routes.constants'

/**
 * Accepts only same-site paths so a crafted ?redirect= cannot send users to another origin.
 * Browsers treat a backslash like a slash, so `/\evil.com` is as dangerous as `//evil.com`.
 */
export const toSafeRedirectPath = (value: string | null | undefined): string => {
  if (!value || !value.startsWith('/')) return PAGE_ROUTES.HOME
  return value.charAt(1) === '/' || value.includes('\\') ? PAGE_ROUTES.HOME : value
}

export const buildLoginPath = (returnTo: string): string =>
  `${PAGE_ROUTES.LOGIN}?${REDIRECT_QUERY_PARAM}=${encodeURIComponent(returnTo)}`
