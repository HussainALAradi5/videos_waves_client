// Cells starting with these run as formulas in spreadsheet apps, so they are escaped on the way out.
const FORMULA_PREFIXES = ['=', '+', '-', '@']

const toCell = (value: unknown): string => {
  const text = value === null || value === undefined ? '' : String(value)
  const safe = FORMULA_PREFIXES.some((prefix) => text.startsWith(prefix)) ? `'${text}` : text
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
}

export const toCsv = (headers: readonly string[], rows: readonly (readonly unknown[])[]): string =>
  [headers, ...rows].map((row) => row.map(toCell).join(',')).join('\r\n') + '\r\n'

/** Parses RFC 4180 CSV (quoted cells, escaped quotes, CRLF or LF) into rows of cells. */
export const parseCsv = (text: string): string[][] => {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let isQuoted = false
  const source = text.replace(/^\uFEFF/, '')
  for (let index = 0; index < source.length; index++) {
    const char = source[index]
    if (isQuoted) {
      if (char === '"' && source[index + 1] === '"') {
        cell += '"'
        index++
      } else if (char === '"') {
        isQuoted = false
      } else {
        cell += char
      }
    } else if (char === '"') {
      isQuoted = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && source[index + 1] === '\n') index++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }
  if (cell !== '' || row.length > 0) rows.push([...row, cell])
  return rows.filter((cells) => cells.some((value) => value.trim() !== ''))
}

/** Rows as objects keyed by the (lower-cased) header row. */
export const parseCsvRecords = (text: string): Record<string, string>[] => {
  const [header, ...rows] = parseCsv(text)
  if (!header) return []
  const keys = header.map((name) => name.trim().toLowerCase())
  return rows.map((cells) => Object.fromEntries(keys.map((key, index) => [key, (cells[index] ?? '').trim()])))
}
