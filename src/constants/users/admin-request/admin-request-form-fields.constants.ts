import { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'
import type { AdminRequestFormValues } from '@/validations/users/admin-request/admin-request-form.validation'

export const ADMIN_REQUEST_FIELDS: FormFieldConfig<keyof AdminRequestFormValues>[] = [
  { name: 'reason', label: 'Reason', type: FormFieldType.TEXTAREA, helperText: '10-500 characters', isRequired: true }
]
