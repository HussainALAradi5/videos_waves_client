import type { SettingRowConfig } from './setting-row-config.interface'

export interface SettingSectionConfig {
  key: string
  title: string
  description: string
  rows: SettingRowConfig[]
}
