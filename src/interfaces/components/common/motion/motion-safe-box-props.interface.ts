import type { BoxProps } from '@chakra-ui/react'

/** Box props without the DOM handlers whose signatures clash with motion's (drag and animation events). */
export type MotionSafeBoxProps = Omit<
  BoxProps,
  'transition' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>
