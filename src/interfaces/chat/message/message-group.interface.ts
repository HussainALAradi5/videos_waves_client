import type { Message } from './message.interface'

/** Consecutive messages from one sender, shown as one stack of bubbles. */
export interface MessageGroup {
  key: string
  senderId: string
  isMine: boolean
  /** Starts a new calendar day: show a day separator above. */
  dayLabel: string | null
  messages: Message[]
}
