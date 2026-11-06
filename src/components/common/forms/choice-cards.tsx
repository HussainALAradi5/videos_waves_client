'use client'

import { HStack, Icon, RadioCard } from '@chakra-ui/react'
import type { ChoiceCardsProps } from '@/interfaces/components/common/forms/choice-cards-props.interface'

/** Pick-one cards with an icon each, tinted by the option's palette when it has one; keyboard and screen-reader friendly (radio group). */
export function ChoiceCards({ options, value, onChange }: ChoiceCardsProps) {
  return (
    <RadioCard.Root value={value} onValueChange={(details) => details.value && onChange(details.value)} colorPalette="brand" width="full">
      <HStack align="stretch" gap="3">
        {options.map((option) => (
          <RadioCard.Item
            key={option.value}
            value={option.value}
            flex="1"
            rounded="xl"
            colorPalette={option.colorPalette ?? 'brand'}
            transition="background 0.2s, border-color 0.2s"
            _hover={{ borderColor: 'colorPalette.emphasized' }}
            _checked={{ bg: 'colorPalette.subtle', borderColor: 'colorPalette.solid' }}
          >
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              {option.icon && (
                <Icon size="lg" color="colorPalette.solid">
                  {option.icon}
                </Icon>
              )}
              <RadioCard.ItemText>{option.label}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}
