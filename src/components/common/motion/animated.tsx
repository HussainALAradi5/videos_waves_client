'use client'

import type { AnimatedProps } from '@/interfaces/components/common/motion/animated-props.interface'
import { useMotionVariants } from '@/hooks/common/use-motion-variants'
import { MotionBox } from './motion-box'

/** Animates its children in (and out, inside AnimatePresence) with a shared variant. */
export function Animated({ variant = 'fadeUp', isLayout = false, children, ...boxProps }: AnimatedProps) {
  const variants = useMotionVariants(variant)
  return (
    <MotionBox variants={variants} initial="hidden" animate="visible" exit="exit" layout={isLayout} {...boxProps}>
      {children}
    </MotionBox>
  )
}
