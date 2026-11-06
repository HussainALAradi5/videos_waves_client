'use client'

import { chakra } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { TRANSITIONS } from '@/constants/common/motion.constants'
import type { AnimatedCountProps } from '@/interfaces/components/common/counters/animated-count-props.interface'
import { formatCount } from '@/utilities/format/count-format.utility'

const MotionSpan = motion.create(chakra.span)

/** A number that rolls up or down when it changes (likes, followers). */
export function AnimatedCount({ value, format = formatCount }: AnimatedCountProps) {
  return (
    <chakra.span display="inline-flex" overflow="hidden" verticalAlign="bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <MotionSpan
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={TRANSITIONS.quick}
        >
          {format(value)}
        </MotionSpan>
      </AnimatePresence>
    </chakra.span>
  )
}
