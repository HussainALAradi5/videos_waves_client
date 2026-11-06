import { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import { MessagePermission } from '@/enums/users/settings/message-permission.enum'
import { SettingKey } from '@/enums/users/settings/setting-key.enum'
import { ThemePreference } from '@/enums/users/settings/theme-preference.enum'
import type { UserSettings } from '@/interfaces/users/settings/user-settings.interface'

/** Guests and first loads use these (same defaults as the server). */
export const DEFAULT_SETTINGS: UserSettings = {
  [SettingKey.THEME]: ThemePreference.SYSTEM,
  [SettingKey.AUTOPLAY_VIDEOS]: true,
  [SettingKey.SHOW_ACTIVITY_STATUS]: true,
  [SettingKey.READ_RECEIPTS]: true,
  [SettingKey.MESSAGE_PERMISSION]: MessagePermission.EVERYONE,
  [SettingKey.MESSAGE_PREVIEWS]: true,
  [SettingKey.MESSAGE_SOUND]: true,
  [SettingKey.BUBBLE_COLOR]: BubbleColor.WAVE
}

/** Background of your own chat bubbles per colour setting. */
export const BUBBLE_BACKGROUNDS: Record<BubbleColor, string> = {
  [BubbleColor.WAVE]: 'linear-gradient(135deg, #22b8ff 0%, #7b61ff 100%)',
  [BubbleColor.OCEAN]: 'linear-gradient(135deg, #0a9df0 0%, #0f64a8 100%)',
  [BubbleColor.SUNSET]: 'linear-gradient(135deg, #ff7a9c 0%, #ff9f43 100%)',
  [BubbleColor.FOREST]: 'linear-gradient(135deg, #1fb88a 0%, #0f7a5c 100%)',
  [BubbleColor.MONO]: 'linear-gradient(135deg, #3f4656 0%, #1f2430 100%)'
}
