import { Field, Input, Textarea } from '@chakra-ui/react'
import { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { FormFieldProps } from '@/interfaces/components/common/forms/form-field-props.interface'

export function FormField({ config, registration, error }: FormFieldProps) {
  return (
    <Field.Root invalid={Boolean(error)} required={config.isRequired}>
      <Field.Label>
        {config.label}
        <Field.RequiredIndicator />
      </Field.Label>
      {config.type === FormFieldType.TEXTAREA ? (
        <Textarea {...registration} placeholder={config.placeholder} autoresize minH="24" />
      ) : (
        <Input {...registration} type={config.type} placeholder={config.placeholder} autoComplete={config.autoComplete} />
      )}
      {config.helperText && !error && <Field.HelperText>{config.helperText}</Field.HelperText>}
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  )
}
