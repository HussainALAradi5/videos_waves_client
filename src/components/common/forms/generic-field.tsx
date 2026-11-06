'use client'

import { Field, Input, Textarea } from '@chakra-ui/react'
import { Controller, type FieldValues, type Path } from 'react-hook-form'
import { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { GenericFieldProps } from '@/interfaces/components/common/forms/generic-field-props.interface'
import { ChoiceCards } from './choice-cards'
import { PasswordInput } from './password-input'

/** Renders one GenericForm input by type: text, email, password (with show/hide), textarea, or choice cards. */
export function GenericField<TValues extends FieldValues>({ config, control, error }: GenericFieldProps<TValues>) {
  return (
    <Field.Root invalid={Boolean(error)} required={config.isRequired}>
      <Field.Label>
        {config.label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        name={config.name as Path<TValues>}
        control={control}
        render={({ field }) => {
          if (config.type === FormFieldType.CHOICE) {
            return <ChoiceCards options={config.options ?? []} value={field.value ?? ''} onChange={field.onChange} />
          }
          if (config.type === FormFieldType.TEXTAREA) {
            return <Textarea {...field} value={field.value ?? ''} placeholder={config.placeholder} maxLength={config.maxLength} autoresize minH="24" rounded="xl" />
          }
          if (config.type === FormFieldType.PASSWORD) {
            return <PasswordInput {...field} value={field.value ?? ''} placeholder={config.placeholder} autoComplete={config.autoComplete} />
          }
          return (
            <Input {...field} value={field.value ?? ''} type={config.type} placeholder={config.placeholder} autoComplete={config.autoComplete} rounded="xl" />
          )
        }}
      />
      {config.helperText && !error && <Field.HelperText>{config.helperText}</Field.HelperText>}
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  )
}
