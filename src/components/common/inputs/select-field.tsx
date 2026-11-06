import { NativeSelect } from '@chakra-ui/react'
import type { SelectFieldProps } from '@/interfaces/components/common/inputs/select-field-props.interface'

export function SelectField<TValue extends string>({ label, value, options, onChange, placeholder }: SelectFieldProps<TValue>) {
  return (
    <NativeSelect.Root width={{ base: 'full', md: '52' }}>
      <NativeSelect.Field aria-label={label} value={value} onChange={(event) => onChange(event.target.value as TValue | '')}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
