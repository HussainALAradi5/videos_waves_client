import type { PropsWithChildren } from 'react'
import type { MotionSafeBoxProps } from './motion-safe-box-props.interface'
import type { MotionVariantName } from '@/constants/common/motion.constants'

export interface AnimatedProps extends PropsWithChildren, MotionSafeBoxProps {
  variant?: MotionVariantName
  /** Use `layout` animation when siblings appear or disappear. */
  isLayout?: boolean
}
