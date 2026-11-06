import { describe, expect, it } from 'vitest'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import { Gender } from '@/enums/users/user/gender.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'
import { groupMessages } from '@/utilities/chat/message-grouping.utility'
import { countSeenBy } from '@/utilities/chat/seen.utility'
import { isWithinEditWindow } from '@/utilities/chat/edit-window.utility'

const user = (id: string) => ({ id, userName: id, avatarUrl: null, gender: Gender.MALE })
const message = (id: string, senderId: string, createdAt: string, kind = MessageKind.TEXT): Message => ({
  id,
  conversationId: 'c1',
  sender: user(senderId),
  kind,
  body: id,
  attachments: [],
  replyTo: null,
  sharedVideo: null,
  systemAction: null,
  systemTarget: null,
  reactions: [],
  myReaction: null,
  isEdited: false,
  isUnsent: false,
  createdAt
})

describe('groupMessages', () => {
  it('groups runs from one sender, oldest first, and splits on day, sender, gap, and system notices', () => {
    const newestFirst = [
      message('m5', 'ana', '2026-11-07T09:00:00.000Z'),
      message('m4', 'ben', '2026-11-06T10:20:00.000Z', MessageKind.SYSTEM),
      message('m3', 'ana', '2026-11-06T10:15:00.000Z'),
      message('m2', 'ana', '2026-11-06T10:01:00.000Z'),
      message('m1', 'ana', '2026-11-06T10:00:00.000Z')
    ]
    const groups = groupMessages(newestFirst, 'ana')
    expect(groups.map((group) => group.messages.map((item) => item.id))).toEqual([['m1', 'm2'], ['m3'], ['m4'], ['m5']])
    expect(groups[0]).toMatchObject({ isMine: true })
    expect(groups[0].dayLabel).not.toBeNull()
    expect(groups[1].dayLabel).toBeNull()
    expect(groups[3].dayLabel).not.toBeNull()
  })
})

describe('countSeenBy', () => {
  it('counts members who read at or after the message, ignoring hidden read times', () => {
    const sent = message('m1', 'ana', '2026-11-06T10:00:00.000Z')
    const member = (lastReadAt: string | null): ChatMember => ({ user: user('x'), role: 'member' as never, lastReadAt, isOnline: null })
    expect(countSeenBy(sent, [member('2026-11-06T10:00:00.000Z'), member('2026-11-06T09:00:00.000Z'), member(null)])).toBe(1)
  })
})

describe('isWithinEditWindow', () => {
  it('allows edits for 15 minutes', () => {
    const now = Date.parse('2026-11-06T10:15:00.000Z')
    expect(isWithinEditWindow('2026-11-06T10:00:00.000Z', now)).toBe(true)
    expect(isWithinEditWindow('2026-11-06T09:59:00.000Z', now)).toBe(false)
  })
})
