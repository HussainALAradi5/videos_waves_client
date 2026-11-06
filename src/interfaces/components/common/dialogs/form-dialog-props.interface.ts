import type { FieldValues } from 'react-hook-form'
import type { GenericFormProps } from '../forms/generic-form-props.interface'

export interface FormDialogProps<TValues extends FieldValues> extends GenericFormProps<TValues> {
  isOpen: boolean
  title: string
  onClose: () => void
}
