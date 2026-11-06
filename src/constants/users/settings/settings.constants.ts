import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'
import { PresenceMode } from '@/enums/users/settings/presence-mode.enum'
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
  [SettingKey.BUBBLE_COLOR]: BubbleColor.WAVE,
  [SettingKey.OTHERS_BUBBLE_COLOR]: BubbleColor.NEUTRAL,
  [SettingKey.BUBBLE_STYLE]: BubbleStyle.ROUNDED,
  [SettingKey.NOTIFY_MESSAGES]: true,
  [SettingKey.PRESENCE]: PresenceMode.ONLINE,
  [SettingKey.STATUS_TEXT]: '',
  [SettingKey.PRIVATE_ACCOUNT]: false
}

export const STATUS_TEXT_MAX = 60

/** Background of your own chat bubbles per colour setting. */
export const BUBBLE_BACKGROUNDS: Record<BubbleColor, string> = {
  [BubbleColor.WAVE]: 'linear-gradient(135deg, #3a7bb5 0%, #1f4e79 100%)',
  [BubbleColor.OCEAN]: 'linear-gradient(135deg, #0a9df0 0%, #0f64a8 100%)',
  [BubbleColor.SUNSET]: 'linear-gradient(135deg, #ff7a9c 0%, #ff9f43 100%)',
  [BubbleColor.FOREST]: 'linear-gradient(135deg, #1fb88a 0%, #0f7a5c 100%)',
  [BubbleColor.MONO]: 'linear-gradient(135deg, #3f4656 0%, #1f2430 100%)',
  // Swatch only: neutral bubbles use the theme's surface (app.bubbleOther) so they suit light and dark.
  [BubbleColor.NEUTRAL]: 'linear-gradient(135deg, #eef1f6 0%, #c9d2df 100%)'
}
