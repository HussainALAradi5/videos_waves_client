import type { ReactElement } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { render } from '@testing-library/react'
import { appSystem } from '@/config/theme/system.config'

/** Renders with the app theme, as every component expects. */
export const renderWithTheme = (ui: ReactElement) => render(<ChakraProvider value={appSystem}>{ui}</ChakraProvider>)
