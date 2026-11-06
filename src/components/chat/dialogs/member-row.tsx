'use client'

import { LuShield, LuShieldOff, LuUserMinus } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import type { MemberRowProps } from '@/interfaces/components/chat/dialogs/member-row-props.interface'
import { ActionMenu } from '@/components/common/dropdown/action-menu'
import { UserRow } from '@/components/users/social/user-row'
import { AdminBadge } from '../common/admin-badge'

/** A group member with an Admin badge and, for admins, make admin, remove admin, and remove. */
export function MemberRow({ member, canManage, onRemove, onSetRole }: MemberRowProps) {
  const isAdmin = member.role === MemberRole.ADMIN
  return (
    <UserRow
      user={member.user}
      action={
        <>
          {isAdmin && <AdminBadge />}
          {canManage && (
            <ActionMenu
              label={CHAT_MESSAGES.CHAT_INFO}
              size="xs"
              items={[
                { key: 'admin', label: isAdmin ? CHAT_MESSAGES.REMOVE_ADMIN : CHAT_MESSAGES.MAKE_ADMIN, icon: isAdmin ? <LuShieldOff /> : <LuShield />, onSelect: () => void onSetRole(isAdmin ? MemberRole.MEMBER : MemberRole.ADMIN) },
                { key: 'remove', label: CHAT_MESSAGES.REMOVE, icon: <LuUserMinus />, onSelect: () => void onRemove(), isDanger: true }
              ]}
            />
          )}
        </>
      }
    />
  )
}
