import type { ReactNode } from 'react'
import type { DefaultValues, FieldValues, Path } from 'react-hook-form'
import type { ZodType } from 'zod'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'

export interface GenericFormProps<TValues extends FieldValues> {
  schema: ZodType<TValues, TValues>
  fields: FormFieldConfig<Path<TValues>>[]
  defaultValues: DefaultValues<TValues>
  submitLabel: string
  /** Rejections with server field details are shown under the matching inputs. */
  onSubmit: (values: TValues) => Promise<unknown>
  isSubmitting?: boolean
  isDisabled?: boolean
  /** Extra content rendered between the fields and the buttons (for example a file picker). */
  children?: ReactNode
  secondaryAction?: ReactNode
}
