const BROWSERS: [RegExp, string][] = [
  [/Edg\//, 'Edge'],
  [/OPR\//, 'Opera'],
  [/Chrome\//, 'Chrome'],
  [/Firefox\//, 'Firefox'],
  [/Safari\//, 'Safari'],
  [/Dart\//, 'Videos Waves app']
]
const SYSTEMS: [RegExp, string][] = [
  [/Windows/, 'Windows'],
  [/Android/, 'Android'],
  [/iPhone|iPad/, 'iOS'],
  [/Mac OS X/, 'macOS'],
  [/Linux/, 'Linux']
]

const firstMatch = (value: string, patterns: [RegExp, string][]): string | null =>
  patterns.find(([pattern]) => pattern.test(value))?.[1] ?? null

/** "Chrome on Windows" from a user-agent string; null when nothing is recognised. */
export const describeUserAgent = (userAgent: string): string | null => {
  const browser = firstMatch(userAgent, BROWSERS)
  const system = firstMatch(userAgent, SYSTEMS)
  if (browser && system) return `${browser} on ${system}`
  return browser ?? system
}
