'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import { conversationService } from '@/services/chat/conversation/conversation.service'
import { socialService } from '@/services/users/social/social.service'
import { notifyError } from '@/utilities/toast/notify.utility'

/** Accept, delete, block, mute, rename, membership, and roles for one conversation. */
export const useConversationActions = (conversationId: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const refresh = () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.chat })
  const leaveToInbox = async () => {
    await refresh()
    router.push(PAGE_ROUTES.MESSAGES)
  }
  const mutate = <T>(run: () => Promise<T>, after: () => Promise<unknown> = refresh) =>
    run().then(after, (error: unknown) => notifyError(error))

  const update = useMutation({ mutationFn: (dto: { title?: string; isMuted?: boolean }) => conversationService.update(conversationId, dto), onSuccess: refresh, onError: notifyError })
  return {
    accept: () => mutate(() => conversationService.accept(conversationId)),
    hide: () => mutate(() => conversationService.hide(conversationId), leaveToInbox),
    block: (userName: string) => mutate(() => socialService.block(userName), leaveToInbox),
    leave: (myUserId: string) => mutate(() => conversationService.removeMember(conversationId, myUserId), leaveToInbox),
    setMuted: (isMuted: boolean) => update.mutateAsync({ isMuted }),
    rename: (title: string) => update.mutateAsync({ title }),
    addMembers: (userNames: string[]) => mutate(() => conversationService.addMembers(conversationId, userNames)),
    removeMember: (userId: string) => mutate(() => conversationService.removeMember(conversationId, userId)),
    setRole: (userId: string, role: MemberRole) => mutate(() => conversationService.setRole(conversationId, userId, role))
  }
}
