'use client'

import { Combobox, Portal, Spinner, Stack, createListCollection } from '@chakra-ui/react'
import { useMemo } from 'react'
import type { MultiSelectDropdownProps } from '@/interfaces/components/common/dropdown/multi-select-dropdown-props.interface'
import { DropdownOptionRow } from './dropdown-option-row'
import { SelectedChips } from './selected-chips'

/** Searchable multi-choice dropdown with removable chips (people pickers, tags). */
export function MultiSelectDropdown(props: MultiSelectDropdownProps) {
  const { label, options, selected, onChange, onSearch, placeholder, emptyText, maxSelected, isLoading = false } = props
  const collection = useMemo(() => createListCollection({ items: options, itemToString: (item) => item.label }), [options])
  const isFull = maxSelected !== undefined && selected.length >= maxSelected
  const byValue = useMemo(() => new Map([...selected, ...options].map((option) => [option.value, option])), [selected, options])

  return (
    <Stack gap="2" width="full">
      <Combobox.Root
        multiple
        collection={collection}
        value={selected.map((option) => option.value)}
        onValueChange={(details) => onChange(details.value.flatMap((value) => byValue.get(value) ?? []))}
        onInputValueChange={(details) => onSearch(details.inputValue)}
        disabled={isFull}
        openOnClick
      >
        {label && <Combobox.Label>{label}</Combobox.Label>}
        <Combobox.Control>
          <Combobox.Input placeholder={placeholder} rounded="xl" bg="app.surface" />
          <Combobox.IndicatorGroup>
            {isLoading && <Spinner size="xs" />}
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content rounded="xl" shadow="lg" p="1">
              <Combobox.Empty>{emptyText}</Combobox.Empty>
              {collection.items.map((option) => (
                <Combobox.Item key={option.value} item={option} rounded="lg">
                  <DropdownOptionRow option={option} />
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
      <SelectedChips options={selected} onRemove={(value) => onChange(selected.filter((option) => option.value !== value))} />
    </Stack>
  )
}
