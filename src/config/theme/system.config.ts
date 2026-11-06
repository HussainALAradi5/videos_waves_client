import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { globalCss } from './global-css.config'
import { keyframes } from './keyframes.config'
import { semanticTokens } from './semantic-tokens.config'
import { tokens } from './tokens.config'

const config = defineConfig({
  globalCss,
  theme: { tokens, semanticTokens, keyframes }
})

/** The app's Chakra system: the default theme extended with brand tokens, light/dark surfaces, and motion. */
export const appSystem = createSystem(defaultConfig, config)
