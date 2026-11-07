'use client'

import { Portal, Select, createListCollection } from '@chakra-ui/react'
import { useMemo } from 'react'
import type { SelectDropdownProps } from '@/interfaces/components/common/dropdown/select-dropdown-props.interface'
import { DropdownOptionRow } from './dropdown-option-row'

/** A styled single-choice dropdown (keyboard, typeahead, and screen-reader support from Chakra). */
export function SelectDropdown(props: SelectDropdownProps) {
  const { label, options, value, onChange, placeholder, size = 'md', width = 'full', isDisabled } = props
  const collection = useMemo(
    () => createListCollection({ items: options, itemToString: (item) => item.label, isItemDisabled: (item) => Boolean(item.isDisabled) }),
    [options]
  )
  const selected = options.find((option) => option.value === value)
  return (
    <Select.Root
      collection={collection}
      value={[value]}
      onValueChange={(details) => details.value[0] && onChange(details.value[0])}
      size={size}
      width={width}
      disabled={isDisabled}
      positioning={{ sameWidth: true }}
    >
      <Select.HiddenSelect />
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger rounded="xl" bg="app.surface">
          <Select.ValueText placeholder={placeholder}>{(selected?.colorPalette || selected?.icon) && <DropdownOptionRow option={selected} />}</Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content rounded="xl" shadow="lg" p="1">
            {collection.items.map((option) => (
              <Select.Item key={option.value} item={option} rounded="lg">
                <DropdownOptionRow option={option} />
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
