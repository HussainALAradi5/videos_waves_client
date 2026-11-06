import { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'
import type { VideoFormValues } from '@/validations/videos/video/video-form.validation'

export const VIDEO_FIELDS: FormFieldConfig<keyof VideoFormValues>[] = [
  { name: 'title', label: 'Title', type: FormFieldType.TEXT, isRequired: true },
  { name: 'description', label: 'Description', type: FormFieldType.TEXTAREA, helperText: 'Optional' }
]
