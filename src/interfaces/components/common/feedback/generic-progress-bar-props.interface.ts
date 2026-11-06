export interface GenericProgressBarProps {
  /** 0 to 100; omit for an indeterminate (wave) bar. */
  value?: number
  label?: string
  size?: 'xs' | 'sm' | 'md'
  showValue?: boolean
}
