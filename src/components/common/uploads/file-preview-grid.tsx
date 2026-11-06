'use client'

import { Wrap } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import type { FilePreviewGridProps } from '@/interfaces/components/common/uploads/file-preview-grid-props.interface'
import { Animated } from '../motion/animated'
import { FilePreviewTile } from './file-preview-tile'

/** The queued files, popping in and out as they are added or removed. */
export function FilePreviewGrid({ items, onRemove, onRetry }: FilePreviewGridProps) {
  return (
    <Wrap gap="3">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <Animated key={item.key} variant="scaleIn" isLayout>
            <FilePreviewTile item={item} onRemove={onRemove} onRetry={onRetry} />
          </Animated>
        ))}
      </AnimatePresence>
    </Wrap>
  )
}
