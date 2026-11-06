'use client'

import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import type { SettingTextInputProps } from '@/interfaces/components/users/settings/setting-text-input-props.interface'

/** A short text setting that saves when you leave the box or press Enter (not on every key). */
export function SettingTextInput({ label, value, maxLength, placeholder, onSave }: SettingTextInputProps) {
  const [draft, setDraft] = useState(value)
  const save = () => {
    const next = draft.trim()
    if (next !== value) onSave(next)
  }
  return (
    <Input
      aria-label={label}
      value={draft}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={save}
      onKeyDown={(event) => event.key === 'Enter' && event.currentTarget.blur()}
      width={{ base: 'full', sm: '64' }}
      rounded="xl"
    />
  )
}
