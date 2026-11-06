import type { SettingControl } from '@/enums/users/settings/setting-control.enum'
import type { SettingKey } from '@/enums/users/settings/setting-key.enum'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

export interface SettingRowConfig {
  key: SettingKey
  label: string
  description: string
  control: SettingControl
  options?: DropdownOption[]
}
