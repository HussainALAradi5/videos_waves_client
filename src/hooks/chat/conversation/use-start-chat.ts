'use client'

import { useRouter } from 'next/navigation'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { conversationService } from '@/services/chat/conversation/conversation.service'
import { notifyError } from '@/utilities/toast/notify.utility'

/** Opens (or creates) the direct chat with someone and goes to it. */
export const useStartChat = () => {
  const router = useRouter()
  return async (userName: string) => {
    try {
      const conversation = await conversationService.startDirect(userName)
      router.push(PAGE_ROUTES.conversation(conversation.id))
    } catch (error) {
      notifyError(error)
    }
  }
}
