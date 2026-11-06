import { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import { MessagePermission } from '@/enums/users/settings/message-permission.enum'
import { SettingControl } from '@/enums/users/settings/setting-control.enum'
import { SettingKey } from '@/enums/users/settings/setting-key.enum'
import { ThemePreference } from '@/enums/users/settings/theme-preference.enum'
import type { SettingSectionConfig } from '@/interfaces/users/settings/setting-section-config.interface'

/** Every preference row, by key. The settings page is rendered entirely from this table. */
export const SETTING_SECTIONS: SettingSectionConfig[] = [
  {
    key: 'appearance',
    title: 'Appearance',
    description: 'How Videos Waves looks on every device you use.',
    rows: [
      {
        key: SettingKey.THEME,
        label: 'Theme',
        description: 'Follow your device, or always use light or dark.',
        control: SettingControl.SELECT,
        options: [
          { value: ThemePreference.SYSTEM, label: 'Same as device' },
          { value: ThemePreference.LIGHT, label: 'Light' },
          { value: ThemePreference.DARK, label: 'Dark' }
        ]
      },
      {
        key: SettingKey.BUBBLE_COLOR,
        label: 'Chat bubbles',
        description: 'The colour of the messages you send.',
        control: SettingControl.SWATCHES,
        options: Object.values(BubbleColor).map((value) => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) }))
      },
      { key: SettingKey.AUTOPLAY_VIDEOS, label: 'Autoplay videos', description: 'Play previews on hover and start videos muted.', control: SettingControl.SWITCH }
    ]
  },
  {
    key: 'privacy',
    title: 'Privacy',
    description: 'Who sees your activity and who can reach you.',
    rows: [
      {
        key: SettingKey.SHOW_ACTIVITY_STATUS,
        label: 'Show activity status',
        description: 'People you chat with can see when you are online. Turn it off to hide yours.',
        control: SettingControl.SWITCH
      },
      {
        key: SettingKey.READ_RECEIPTS,
        label: 'Read receipts',
        description: 'Let others see when you have read their messages.',
        control: SettingControl.SWITCH
      },
      {
        key: SettingKey.MESSAGE_PERMISSION,
        label: 'Who can message you',
        description: 'Messages from people you do not follow land in Requests either way.',
        control: SettingControl.SELECT,
        options: [
          { value: MessagePermission.EVERYONE, label: 'Everyone' },
          { value: MessagePermission.FOLLOWING, label: 'Only people I follow' }
        ]
      }
    ]
  },
  {
    key: 'notifications',
    title: 'Notifications',
    description: 'What happens when a message arrives.',
    rows: [
      { key: SettingKey.MESSAGE_PREVIEWS, label: 'Message previews', description: 'Show the text of new messages in your inbox.', control: SettingControl.SWITCH },
      { key: SettingKey.MESSAGE_SOUND, label: 'Message sound', description: 'Play a soft sound for new messages.', control: SettingControl.SWITCH }
    ]
  }
]
