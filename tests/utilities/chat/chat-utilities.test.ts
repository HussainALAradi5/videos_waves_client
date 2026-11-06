import { describe, expect, it } from 'vitest'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import { Gender } from '@/enums/users/user/gender.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'
import { groupMessages } from '@/utilities/chat/message-grouping.utility'
import { countSeenBy, readStateOf } from '@/utilities/chat/seen.utility'
import { bubbleLook } from '@/utilities/chat/bubble-look.utility'
import { describePresence } from '@/utilities/chat/presence.utility'
import { ReadState } from '@/enums/chat/message/read-state.enum'
import { PresenceState } from '@/enums/chat/realtime/presence-state.enum'
import { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'
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

const member = (lastReadAt: string | null): ChatMember => ({
  user: user('x'),
  role: 'member' as never,
  lastReadAt,
  isOnline: null,
  presence: null,
  statusText: null
})

describe('countSeenBy', () => {
  it('counts members who read at or after the message, ignoring hidden read times', () => {
    const sent = message('m1', 'ana', '2026-11-06T10:00:00.000Z')
    expect(countSeenBy(sent, [member('2026-11-06T10:00:00.000Z'), member('2026-11-06T09:00:00.000Z'), member(null)])).toBe(1)
  })
})

describe('readStateOf', () => {
  const sent = message('m1', 'ana', '2026-11-06T10:00:00.000Z')
  it('is one tick until anyone reads, grey double when some did, read when everyone did', () => {
    expect(readStateOf(sent, [member(null)])).toBe(ReadState.SENT)
    expect(readStateOf(sent, [member('2026-11-06T10:05:00.000Z'), member(null)])).toBe(ReadState.SEEN_BY_SOME)
    expect(readStateOf(sent, [member('2026-11-06T10:05:00.000Z'), member('2026-11-06T10:01:00.000Z')])).toBe(ReadState.READ)
    expect(readStateOf(sent, [])).toBe(ReadState.SENT)
  })
})

describe('describePresence', () => {
  it('joins the status and the custom line, and hides offline', () => {
    expect(describePresence({ ...member(null), presence: PresenceState.BUSY, statusText: 'In a meeting' })).toBe('Busy · In a meeting')
    expect(describePresence({ ...member(null), presence: PresenceState.OFFLINE, statusText: 'Back at 3' })).toBe('Back at 3')
    expect(describePresence({ ...member(null), presence: null, statusText: null })).toBeNull()
  })
})

describe('bubbleLook', () => {
  const base = { isMine: true, isUnsent: false, style: BubbleStyle.ROUNDED, myColor: BubbleColor.FOREST, othersColor: BubbleColor.NEUTRAL }
  it('paints my colour, a neutral surface for theirs, outlines when minimal, and greys out unsent', () => {
    expect(bubbleLook(base)).toMatchObject({ color: 'white', bgImage: expect.stringContaining('gradient') })
    expect(bubbleLook({ ...base, isMine: false })).toEqual({ bg: 'app.bubbleOther', color: 'fg' })
    expect(bubbleLook({ ...base, style: BubbleStyle.MINIMAL, isMine: false })).toMatchObject({ bg: 'transparent', borderWidth: '1px' })
    expect(bubbleLook({ ...base, isUnsent: true })).toEqual({ bg: 'bg.muted', color: 'fg.muted' })
  })
})

describe('isWithinEditWindow', () => {
  it('allows edits for 15 minutes', () => {
    const now = Date.parse('2026-11-06T10:15:00.000Z')
    expect(isWithinEditWindow('2026-11-06T10:00:00.000Z', now)).toBe(true)
    expect(isWithinEditWindow('2026-11-06T09:59:00.000Z', now)).toBe(false)
  })
})
