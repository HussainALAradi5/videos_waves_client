'use client'

import { IconButton, Input, InputGroup } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { FORM_MESSAGES } from '@/constants/common/form-messages.constants'
import type { PasswordInputProps } from '@/interfaces/components/common/forms/password-input-props.interface'

/** Password input with a show/hide toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(props, ref) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <InputGroup
      endElement={
        <IconButton
          aria-label={isVisible ? FORM_MESSAGES.HIDE_PASSWORD : FORM_MESSAGES.SHOW_PASSWORD}
          variant="ghost"
          size="xs"
          rounded="full"
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      }
    >
      <Input ref={ref} {...props} type={isVisible ? 'text' : 'password'} rounded="xl" />
    </InputGroup>
  )
})
