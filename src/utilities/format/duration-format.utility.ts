const SECONDS_PER_MINUTE = 60

/** 75.4 -> "1:15"; null when unknown. */
export const formatDuration = (seconds: number | null): string | null => {
  if (seconds === null || !Number.isFinite(seconds)) return null
  const whole = Math.round(seconds)
  const minutes = Math.floor(whole / SECONDS_PER_MINUTE)
  return `${minutes}:${String(whole % SECONDS_PER_MINUTE).padStart(2, '0')}`
}
