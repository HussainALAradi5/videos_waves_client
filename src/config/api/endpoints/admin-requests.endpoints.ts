const segment = (value: string): string => encodeURIComponent(value)

export const ADMIN_REQUEST_ENDPOINTS = {
  ROOT: '/admin-requests',
  byId: (requestId: string) => `/admin-requests/${segment(requestId)}`,
  decision: (requestId: string) => `/admin-requests/${segment(requestId)}/decision`
} as const
