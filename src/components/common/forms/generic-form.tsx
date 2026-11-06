'use client'

import { HStack, Stack } from '@chakra-ui/react'
import type { FieldValues } from 'react-hook-form'
import type { GenericFormProps } from '@/interfaces/components/common/forms/generic-form-props.interface'
import { useGenericForm } from '@/hooks/common/use-generic-form'
import { GenericButton } from '../buttons/generic-button'
import { StaggerGroup } from '../motion/stagger-group'
import { Animated } from '../motion/animated'
import { GenericField } from './generic-field'

/**
 * Config-driven form: pass a zod schema and field configs, get validation, server field errors,
 * and a submit button that spins and cannot be pressed twice while the request runs.
 */
export function GenericForm<TValues extends FieldValues>(props: GenericFormProps<TValues>) {
  const { schema, fields, defaultValues, submitLabel, onSubmit, isSubmitting, isDisabled, children, secondaryAction } = props
  const fieldNames = fields.map((field) => field.name)
  const form = useGenericForm(schema, defaultValues, fieldNames, onSubmit)

  return (
    <form onSubmit={form.submit} noValidate>
      <StaggerGroup>
        <Stack gap="5">
          {fields.map((field) => (
            <Animated key={field.name}>
              <GenericField config={field} control={form.control} error={form.errors[field.name]?.message as string | undefined} />
            </Animated>
          ))}
          {children}
          <HStack justify="flex-end" gap="3">
            {secondaryAction}
            <GenericButton type="submit" tone="gradient" isLoading={isSubmitting || form.isSubmitting} disabled={isDisabled}>
              {submitLabel}
            </GenericButton>
          </HStack>
        </Stack>
      </StaggerGroup>
    </form>
  )
}
