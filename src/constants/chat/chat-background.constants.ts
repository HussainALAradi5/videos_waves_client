import { ChatBackground } from '@/enums/chat/conversation/chat-background.enum'

/** Soft, see-through layers, so the same wallpaper suits light and dark themes. */
export const CHAT_BACKGROUNDS: Record<ChatBackground, { label: string; image?: string; size?: string }> = {
  [ChatBackground.NONE]: { label: 'Default' },
  [ChatBackground.WAVES]: {
    label: 'Waves',
    image: 'radial-gradient(120% 70% at 0% 0%, rgba(58,123,181,.16), transparent 60%), radial-gradient(120% 70% at 100% 100%, rgba(31,78,121,.16), transparent 60%)'
  },
  [ChatBackground.OCEAN]: { label: 'Ocean', image: 'linear-gradient(180deg, rgba(10,157,240,.08) 0%, rgba(15,100,168,.20) 100%)' },
  [ChatBackground.MINT]: { label: 'Mint', image: 'linear-gradient(160deg, rgba(31,184,138,.10) 0%, rgba(15,122,92,.18) 100%)' },
  [ChatBackground.SAND]: { label: 'Sand', image: 'linear-gradient(160deg, rgba(245,200,140,.20) 0%, rgba(214,160,100,.16) 100%)' },
  [ChatBackground.BLUSH]: { label: 'Blush', image: 'linear-gradient(160deg, rgba(255,175,195,.22) 0%, rgba(255,140,170,.10) 100%)' },
  [ChatBackground.NIGHT]: { label: 'Night', image: 'linear-gradient(180deg, rgba(13,31,48,.10) 0%, rgba(13,31,48,.34) 100%)' },
  [ChatBackground.DOTS]: { label: 'Dots', image: 'radial-gradient(circle, rgba(91,143,196,.28) 1px, transparent 1.6px)', size: '18px 18px' }
}
