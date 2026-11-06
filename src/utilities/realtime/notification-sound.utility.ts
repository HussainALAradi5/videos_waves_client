const FREQUENCY_HZ = 880
const DURATION_S = 0.12

/** A short, soft "pop" synthesised with Web Audio (no audio file to host). Silent if audio is blocked. */
export const playIncomingSound = (): void => {
  try {
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.value = FREQUENCY_HZ
    gain.gain.setValueAtTime(0.08, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + DURATION_S)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + DURATION_S)
    oscillator.onended = () => void context.close()
  } catch {
    // Autoplay rules can block audio until the user interacts with the page.
  }
}
