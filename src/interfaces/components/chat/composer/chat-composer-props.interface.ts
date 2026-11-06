import type { useChatComposer } from '@/hooks/chat/message/use-chat-composer'

export interface ChatComposerProps {
  sharedVideoId: string | null
  composer: ReturnType<typeof useChatComposer>
}
