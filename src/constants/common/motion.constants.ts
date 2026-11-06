import type { Transition, Variants } from 'motion/react'

export const TRANSITIONS = {
  spring: { type: 'spring', stiffness: 380, damping: 30 },
  soft: { type: 'spring', stiffness: 220, damping: 26 },
  quick: { duration: 0.18, ease: 'easeOut' },
  smooth: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
} satisfies Record<string, Transition>

/** Shared entrance and exit animations; components pick one by name so motion feels consistent. */
export const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
    exit: { opacity: 0, y: -8, transition: TRANSITIONS.quick }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: TRANSITIONS.smooth },
    exit: { opacity: 0, transition: TRANSITIONS.quick }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: TRANSITIONS.spring },
    exit: { opacity: 0, scale: 0.96, transition: TRANSITIONS.quick }
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: TRANSITIONS.soft },
    exit: { opacity: 0, x: 24, transition: TRANSITIONS.quick }
  },
  collapse: {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: TRANSITIONS.smooth },
    exit: { opacity: 0, height: 0, transition: TRANSITIONS.quick }
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } }
  }
} satisfies Record<string, Variants>

export type MotionVariantName = keyof typeof VARIANTS

/** Hover and press feedback for tappable cards and buttons. */
export const PRESS = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } } as const

export const HEART_BURST_MS = 700
