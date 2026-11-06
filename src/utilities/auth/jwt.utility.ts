const MS_PER_SECOND = 1000

/** Reads `exp` from a JWT without verifying it (the server verifies); null when it cannot be read. */
export const readTokenExpiry = (token: string): number | null => {
  try {
    const [, payload] = token.split('.')
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number }
    return typeof json.exp === 'number' ? json.exp * MS_PER_SECOND : null
  } catch {
    return null
  }
}

export const isTokenExpiring = (token: string, marginMs: number, now = Date.now()): boolean => {
  const expiry = readTokenExpiry(token)
  return expiry === null || expiry - now <= marginMs
}
