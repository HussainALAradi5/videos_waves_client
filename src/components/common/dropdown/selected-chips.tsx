'use client'

import { Tag, Wrap } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import type { SelectedChipsProps } from '@/interfaces/components/common/dropdown/selected-chips-props.interface'
import { Animated } from '../motion/animated'

/** Animated, removable chips for the current multi-select choices. */
export function SelectedChips({ options, onRemove }: SelectedChipsProps) {
  return (
    <Wrap gap="2">
      <AnimatePresence initial={false}>
        {options.map((option) => (
          <Animated key={option.value} variant="scaleIn" isLayout>
            <Tag.Root size="lg" rounded="full" colorPalette="brand" variant="subtle">
              {option.icon && <Tag.StartElement>{option.icon}</Tag.StartElement>}
              <Tag.Label>{option.label}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger onClick={() => onRemove(option.value)} />
              </Tag.EndElement>
            </Tag.Root>
          </Animated>
        ))}
      </AnimatePresence>
    </Wrap>
  )
}
