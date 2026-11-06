const UNITS = ['B', 'KB', 'MB', 'GB'] as const
const STEP = 1024

/** "25 MB", "1.5 GB": the largest unit that keeps the number at least 1. */
export const formatFileSize = (bytes: number): string => {
  let value = bytes
  let unit = 0
  while (value >= STEP && unit < UNITS.length - 1) {
    value /= STEP
    unit += 1
  }
  return `${Number.isInteger(value) ? value : value.toFixed(1)} ${UNITS[unit]}`
}
