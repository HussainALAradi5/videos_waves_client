const PHONE = /^\+[1-9]\d{7,14}$/

export const normalizePhone = (value: string): string => {
  const compact = value.replace(/[\s\-().]/g, '')
  return compact.startsWith('00') ? `+${compact.slice(2)}` : compact
}

export const isPhone = (value: string): boolean => PHONE.test(normalizePhone(value))
