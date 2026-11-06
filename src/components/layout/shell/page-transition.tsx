'use client'

import type { PropsWithChildren } from 'react'
import { MotionBox } from '@/components/common/motion/motion-box'
import { useMotionVariants } from '@/hooks/common/use-motion-variants'

/** Enter-only page animation: exit animations fight the App Router, which swaps pages at once. */
export function PageTransition({ children }: PropsWithChildren) {
  const variants = useMotionVariants('fadeUp')
  return (
    <MotionBox variants={variants} initial="hidden" animate="visible">
      {children}
    </MotionBox>
  )
}
