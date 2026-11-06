import type { QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { TYPING_TIMEOUT_MS } from '@/constants/chat/realtime/typing.constants'
import type { TypingEvent } from '@/interfaces/chat/realtime/typing-event.interface'

const timers = new Map<string, ReturnType<typeof setTimeout>>()

/** Who is typing per conversation, kept in the query cache (no extra state library) with auto-expiry. */
export const applyTyping = (client: QueryClient, event: TypingEvent): void => {
  const key = QUERY_KEYS.typing(event.conversationId)
  const timerKey = `${event.conversationId}:${event.userId}`
  const update = (isTyping: boolean) =>
    client.setQueryData<string[]>(key, (current = []) =>
      isTyping ? [...new Set([...current, event.userId])] : current.filter((id) => id !== event.userId)
    )
  clearTimeout(timers.get(timerKey))
  update(event.isTyping)
  if (event.isTyping) timers.set(timerKey, setTimeout(() => update(false), TYPING_TIMEOUT_MS))
}
