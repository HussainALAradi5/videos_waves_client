'use client'

import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import type { PeoplePickerProps } from '@/interfaces/components/chat/dialogs/people-picker-props.interface'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { MultiSelectDropdown } from '@/components/common/dropdown/multi-select-dropdown'

/** The multi-select dropdown fed by people search, each option with its avatar. */
export function PeoplePicker({ picker, maxSelected }: PeoplePickerProps) {
  const options = picker.people.map((person) => ({ value: person.userName, label: person.userName, icon: <UserAvatar user={person} size="xs" /> }))
  return (
    <MultiSelectDropdown
      label={CHAT_MESSAGES.PEOPLE}
      options={options}
      selected={picker.selected}
      onChange={picker.setSelected}
      onSearch={picker.setSearch}
      placeholder={CHAT_MESSAGES.PEOPLE_PLACEHOLDER}
      emptyText={CHAT_MESSAGES.NO_PEOPLE_FOUND}
      maxSelected={maxSelected}
      isLoading={picker.isLoading}
    />
  )
}
