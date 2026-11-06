'use client'

import { AbsoluteCenter, Icon } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { FaHeart } from 'react-icons/fa6'
import type { HeartBurstProps } from '@/interfaces/components/videos/video/heart-burst-props.interface'
import { MotionBox } from '@/components/common/motion/motion-box'

/** The big heart that pops over the player on a double tap. */
export function HeartBurst({ burstKey }: HeartBurstProps) {
  return (
    <AnimatePresence>
      {burstKey > 0 && (
        <AbsoluteCenter key={burstKey} pointerEvents="none">
          <MotionBox
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.25, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.35, 0.7, 1] }}
          >
            <Icon boxSize="24" color="white" filter="drop-shadow(0 6px 20px rgba(255, 92, 138, 0.8))">
              <FaHeart />
            </Icon>
          </MotionBox>
        </AbsoluteCenter>
      )}
    </AnimatePresence>
  )
}
