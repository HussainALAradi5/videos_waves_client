import type { PropsWithChildren } from 'react'
import { Container } from '@chakra-ui/react'
import { LAYOUT } from '@/constants/common/theme.constants'

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <Container as="main" maxW={LAYOUT.CONTENT_MAX_WIDTH} px={{ base: '4', md: '6' }} py={{ base: '6', md: '10' }}>
      {children}
    </Container>
  )
}
