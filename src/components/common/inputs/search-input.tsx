import { Input, InputGroup } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import type { SearchInputProps } from '@/interfaces/components/common/inputs/search-input-props.interface'

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <InputGroup startElement={<LuSearch />} flex="1">
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  )
}
