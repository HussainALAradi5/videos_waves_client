const UNITS = ['B', 'KB', 'MB', 'GB'] as const
const STEP = 1024

/** 1536 -> "1.5 KB". */
export const formatFileSize = (bytes: number): string => {
  let value = bytes
  let unit = 0
  while (value >= STEP && unit < UNITS.length - 1) {
    value /= STEP
    unit += 1
  }
  return `${value >= 10 || unit === 0 ? Math.round(value) : value.toFixed(1)} ${UNITS[unit]}`
}
