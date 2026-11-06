export interface AnimatedCountProps {
  value: number
  /** Formats the number for display (compact counts by default). */
  format?: (value: number) => string
}
