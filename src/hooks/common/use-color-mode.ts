'use client'

import { useTheme } from 'next-themes'

const DARK = 'dark'
const LIGHT = 'light'

export const useColorMode = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === DARK
  return { isDark, toggleColorMode: () => setTheme(isDark ? LIGHT : DARK) }
}
