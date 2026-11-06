import { PAGE_ROUTES, REDIRECT_QUERY_PARAM } from '@/constants/common/routes.constants'

/** Accepts only same-site paths so a crafted ?redirect= cannot send users to another origin. */
export const toSafeRedirectPath = (value: string | null | undefined): string =>
  value && value.startsWith('/') && !value.startsWith('//') ? value : PAGE_ROUTES.HOME

export const buildLoginPath = (returnTo: string): string =>
  `${PAGE_ROUTES.LOGIN}?${REDIRECT_QUERY_PARAM}=${encodeURIComponent(returnTo)}`
