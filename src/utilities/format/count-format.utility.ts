const compactFormatter = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

export const formatCount = (value: number): string => compactFormatter.format(value)
