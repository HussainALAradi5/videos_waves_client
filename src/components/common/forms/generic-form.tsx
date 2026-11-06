'use client'

import { Button, HStack, Stack } from '@chakra-ui/react'
import type { FieldValues } from 'react-hook-form'
import { PALETTES } from '@/constants/common/theme.constants'
import type { GenericFormProps } from '@/interfaces/components/common/forms/generic-form-props.interface'
import { useGenericForm } from '@/hooks/common/use-generic-form'
import { FormField } from './form-field'

/** Config-driven form: pass a zod schema and field configs, get validation, server errors, and a submit button. */
export function GenericForm<TValues extends FieldValues>(props: GenericFormProps<TValues>) {
  const { schema, fields, defaultValues, submitLabel, onSubmit, isSubmitting, isDisabled, children, secondaryAction } = props
  const fieldNames = fields.map((field) => field.name)
  const { register, errors, submit } = useGenericForm(schema, defaultValues, fieldNames, onSubmit)

  return (
    <form onSubmit={submit} noValidate>
      <Stack gap="5">
        {fields.map((field) => (
          <FormField
            key={field.name}
            config={field}
            registration={register(field.name)}
            error={errors[field.name]?.message as string | undefined}
          />
        ))}
        {children}
        <HStack justify="flex-end" gap="3">
          {secondaryAction}
          <Button type="submit" colorPalette={PALETTES.BRAND} loading={isSubmitting} disabled={isDisabled}>
            {submitLabel}
          </Button>
        </HStack>
      </Stack>
    </form>
  )
}
