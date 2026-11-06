'use client'

import { LuLink, LuPencil, LuSend, LuTrash2 } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import type { VideoActionsProps } from '@/interfaces/components/videos/video/video-actions-props.interface'
import { useVideoOwnerActions } from '@/hooks/videos/video/use-video-owner-actions'
import { useShareLink } from '@/hooks/common/use-share-link'
import { ActionMenu } from '@/components/common/dropdown/action-menu'
import { VideoEditDialog } from './video-edit-dialog'
import { VideoDeleteDialog } from './video-delete-dialog'

/** The video three-dots menu: copy link and share for everyone; edit and delete for the owner or an admin. */
export function VideoActions({ video, canManage }: VideoActionsProps) {
  const actions = useVideoOwnerActions(video.id)
  const { copyLink, shareInChat } = useShareLink(video)

  return (
    <>
      <ActionMenu
        label={VIDEO_MESSAGES.OPTIONS}
        items={[
          { key: 'copy', label: VIDEO_MESSAGES.COPY_LINK, icon: <LuLink />, onSelect: copyLink },
          { key: 'share', label: VIDEO_MESSAGES.SHARE_IN_CHAT, icon: <LuSend />, onSelect: shareInChat },
          { key: 'edit', label: MESSAGES.COMMON.EDIT, icon: <LuPencil />, onSelect: actions.openEdit, isHidden: !canManage },
          { key: 'delete', label: MESSAGES.COMMON.DELETE, icon: <LuTrash2 />, onSelect: actions.openDelete, isHidden: !canManage, isDanger: true }
        ]}
      />
      <VideoEditDialog video={video} isOpen={actions.isEditOpen} onClose={actions.closeEdit} onSave={actions.update.mutateAsync} />
      <VideoDeleteDialog video={video} isOpen={actions.isDeleteOpen} onClose={actions.closeDelete} onConfirm={actions.remove.mutateAsync} />
    </>
  )
}
