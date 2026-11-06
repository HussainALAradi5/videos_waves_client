'use client'

import { HStack, RadioCard } from '@chakra-ui/react'
import type { ChoiceCardsProps } from '@/interfaces/components/common/forms/choice-cards-props.interface'

/** Pick-one cards with an icon each; keyboard and screen-reader friendly (radio group). */
export function ChoiceCards({ options, value, onChange }: ChoiceCardsProps) {
  return (
    <RadioCard.Root value={value} onValueChange={(details) => details.value && onChange(details.value)} colorPalette="brand" width="full">
      <HStack align="stretch" gap="3">
        {options.map((option) => (
          <RadioCard.Item key={option.value} value={option.value} flex="1" rounded="xl">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              {option.icon}
              <RadioCard.ItemText>{option.label}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}
