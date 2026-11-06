import type { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'
import type { PresenceMode } from '@/enums/users/settings/presence-mode.enum'
import type { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import type { MessagePermission } from '@/enums/users/settings/message-permission.enum'
import type { SettingKey } from '@/enums/users/settings/setting-key.enum'
import type { ThemePreference } from '@/enums/users/settings/theme-preference.enum'

/** The value type of each setting key (mirrors the server). */
export interface UserSettings {
  [SettingKey.THEME]: ThemePreference
  [SettingKey.AUTOPLAY_VIDEOS]: boolean
  [SettingKey.SHOW_ACTIVITY_STATUS]: boolean
  [SettingKey.READ_RECEIPTS]: boolean
  [SettingKey.MESSAGE_PERMISSION]: MessagePermission
  [SettingKey.MESSAGE_PREVIEWS]: boolean
  [SettingKey.MESSAGE_SOUND]: boolean
  [SettingKey.BUBBLE_COLOR]: BubbleColor
  [SettingKey.OTHERS_BUBBLE_COLOR]: BubbleColor
  [SettingKey.BUBBLE_STYLE]: BubbleStyle
  [SettingKey.NOTIFY_MESSAGES]: boolean
  [SettingKey.PRESENCE]: PresenceMode
  [SettingKey.STATUS_TEXT]: string
  [SettingKey.PRIVATE_ACCOUNT]: boolean
}
