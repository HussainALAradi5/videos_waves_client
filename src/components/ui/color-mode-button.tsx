'use client'

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { useColorMode } from '@/hooks/common/use-color-mode'

export function ColorModeButton() {
  const { isDark, toggleColorMode } = useColorMode()

  // The theme is only known in the browser, so render a placeholder on the server.
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" borderRadius="md" />}>
      <IconButton aria-label={MESSAGES.NAV.TOGGLE_COLOR_MODE} variant="ghost" color="white" onClick={toggleColorMode}>
        {isDark ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}
