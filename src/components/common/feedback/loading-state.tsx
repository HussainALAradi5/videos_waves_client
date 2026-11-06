import { Center } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { WaveLoader } from '../waves/wave-loader'

export function LoadingState() {
  return (
    <Center py="16">
      <WaveLoader label={MESSAGES.COMMON.LOADING} size="lg" />
    </Center>
  )
}
