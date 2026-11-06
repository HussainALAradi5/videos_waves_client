const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const dateFormatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' })

const UNITS: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
  { unit: 'year', seconds: 365 * 24 * 3600 },
  { unit: 'month', seconds: 30 * 24 * 3600 },
  { unit: 'week', seconds: 7 * 24 * 3600 },
  { unit: 'day', seconds: 24 * 3600 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 }
]

export const formatRelativeDate = (isoDate: string, now: Date = new Date()): string => {
  const elapsedSeconds = (new Date(isoDate).getTime() - now.getTime()) / 1000
  const match = UNITS.find(({ seconds }) => Math.abs(elapsedSeconds) >= seconds)
  return match
    ? relativeFormatter.format(Math.round(elapsedSeconds / match.seconds), match.unit)
    : relativeFormatter.format(0, 'minute')
}

export const formatDate = (isoDate: string): string => dateFormatter.format(new Date(isoDate))
