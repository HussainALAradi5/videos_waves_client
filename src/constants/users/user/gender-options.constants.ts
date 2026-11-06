import { createElement } from 'react'
import { IoFemale, IoMale } from 'react-icons/io5'
import { Gender } from '@/enums/users/user/gender.enum'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

/** Picks the standard avatar until a profile picture is uploaded. */
export const GENDER_OPTIONS: DropdownOption[] = [
  { value: Gender.MALE, label: 'Male', icon: createElement(IoMale) },
  { value: Gender.FEMALE, label: 'Female', icon: createElement(IoFemale) }
]
