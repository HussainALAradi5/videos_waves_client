const PHONE = /^\+[1-9]\d{7,14}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const normalizePhone = (value: string): string => {
  const compact = value.replace(/[\s\-().]/g, '')
  return compact.startsWith('00') ? `+${compact.slice(2)}` : compact
}

export const isPhone = (value: string): boolean => PHONE.test(normalizePhone(value))

/** People search only runs for a full email or phone number (the server matches them exactly). */
export const isContactQuery = (value: string): boolean => EMAIL.test(value.trim()) || isPhone(value)
