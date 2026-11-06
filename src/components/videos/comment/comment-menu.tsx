'use client'

import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { COMMENT_MESSAGES } from '@/constants/videos/comment/comment-messages.constants'
import type { CommentMenuProps } from '@/interfaces/components/videos/comment/comment-menu-props.interface'
import { ActionMenu } from '@/components/common/dropdown/action-menu'

/** Edit (author) and Delete (author, video owner, admin). Delete is undoable from the toast. */
export function CommentMenu({ canEdit, canDelete, onEdit, onDelete }: CommentMenuProps) {
  return (
    <ActionMenu
      label={COMMENT_MESSAGES.OPTIONS}
      size="xs"
      items={[
        { key: 'edit', label: MESSAGES.COMMON.EDIT, icon: <LuPencil />, onSelect: onEdit, isHidden: !canEdit },
        { key: 'delete', label: MESSAGES.COMMON.DELETE, icon: <LuTrash2 />, onSelect: () => void onDelete(), isHidden: !canDelete, isDanger: true }
      ]}
    />
  )
}
