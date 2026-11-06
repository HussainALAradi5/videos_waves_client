'use client'

import { useReducedMotion, type Variants } from 'motion/react'
import { VARIANTS, type MotionVariantName } from '@/constants/common/motion.constants'

const STILL: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }

/** The named variants, or a plain fade when the user asked the OS to reduce motion. */
export const useMotionVariants = (name: MotionVariantName): Variants => {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? STILL : VARIANTS[name]
}
