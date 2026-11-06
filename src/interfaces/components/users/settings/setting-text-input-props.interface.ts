export interface SettingTextInputProps {
  label: string
  value: string
  maxLength?: number
  placeholder?: string
  onSave: (value: string) => void
}
