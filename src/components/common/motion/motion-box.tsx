'use client'

import { Box } from '@chakra-ui/react'
import { motion } from 'motion/react'

/** A Chakra Box that also takes motion props (variants, layout, whileHover, …). */
export const MotionBox = motion.create(Box)
