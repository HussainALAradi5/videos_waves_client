'use client'

import type { StaggerGroupProps } from '@/interfaces/components/common/motion/stagger-group-props.interface'
import { VARIANTS } from '@/constants/common/motion.constants'
import { MotionBox } from './motion-box'

/** Children that use `<Animated>` appear one after another. */
export function StaggerGroup({ children, ...boxProps }: StaggerGroupProps) {
  return (
    <MotionBox variants={VARIANTS.staggerContainer} initial="hidden" animate="visible" {...boxProps}>
      {children}
    </MotionBox>
  )
}
