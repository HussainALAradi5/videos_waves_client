import { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'
import { PRESENCE_OPTIONS } from '@/constants/chat/presence.constants'
import { STATUS_TEXT_MAX } from './settings.constants'
import { MessagePermission } from '@/enums/users/settings/message-permission.enum'
import { SettingControl } from '@/enums/users/settings/setting-control.enum'
import { SettingKey } from '@/enums/users/settings/setting-key.enum'
import { ThemePreference } from '@/enums/users/settings/theme-preference.enum'
import type { SettingSectionConfig } from '@/interfaces/users/settings/setting-section-config.interface'

const BUBBLE_COLOR_OPTIONS = Object.values(BubbleColor).map((value) => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) }))

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
      { key: SettingKey.AUTOPLAY_VIDEOS, label: 'Autoplay videos', description: 'Play previews on hover and start videos muted.', control: SettingControl.SWITCH }
    ]
  },
  {
    key: 'chats',
    title: 'Chats',
    description: 'How messages look to you. Only you see these choices.',
    preview: 'bubbles',
    rows: [
      {
        key: SettingKey.BUBBLE_STYLE,
        label: 'Bubble shape',
        description: 'Rounded, square, or minimal outlines.',
        control: SettingControl.SELECT,
        options: [
          { value: BubbleStyle.ROUNDED, label: 'Rounded' },
          { value: BubbleStyle.SQUARE, label: 'Square' },
          { value: BubbleStyle.MINIMAL, label: 'Minimal' }
        ]
      },
      { key: SettingKey.BUBBLE_COLOR, label: 'My messages', description: 'The colour of the messages you send.', control: SettingControl.SWATCHES, options: BUBBLE_COLOR_OPTIONS },
      { key: SettingKey.OTHERS_BUBBLE_COLOR, label: 'Their messages', description: 'The colour of messages you receive.', control: SettingControl.SWATCHES, options: BUBBLE_COLOR_OPTIONS },
      { key: SettingKey.NOTIFY_MESSAGES, label: 'Message pop-ups', description: 'Show a pop-up when a message arrives in a chat you do not have open.', control: SettingControl.SWITCH }
    ]
  },
  {
    key: 'status',
    title: 'Status',
    description: 'What the people you chat with see next to your name.',
    rows: [
      {
        key: SettingKey.PRESENCE,
        label: 'Status',
        description: 'Appear offline to look away even while you are here.',
        control: SettingControl.SELECT,
        options: PRESENCE_OPTIONS
      },
      {
        key: SettingKey.STATUS_TEXT,
        label: 'Custom status',
        description: 'A short line people see in your chats. Leave empty for none.',
        control: SettingControl.TEXT,
        maxLength: STATUS_TEXT_MAX,
        placeholder: 'In a meeting until 3'
      }
    ]
  },
  {
    key: 'privacy',
    title: 'Privacy',
    description: 'Who sees your activity and who can reach you.',
    rows: [
      {
        key: SettingKey.PRIVATE_ACCOUNT,
        label: 'Private account',
        description: 'Only people you approve can see your videos and who you follow. Going public accepts everyone waiting.',
        control: SettingControl.SWITCH
      },
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
