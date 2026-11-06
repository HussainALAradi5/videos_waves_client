export interface WaveLayerProps {
  color: string
  opacity: number
  /** A duration token (`wave`, `waveSlow`). */
  duration: string
  height: string
  isReversed: boolean
  /** Offsets this layer's rise and fall so the layers never move in lockstep. */
  rollDelay?: string
  /** Fills the wave with the blue-to-pink brand gradient instead of `color`. */
  hasGradient?: boolean
}
