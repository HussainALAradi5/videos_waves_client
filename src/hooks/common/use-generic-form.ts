'use client'

import { useForm, type DefaultValues, type FieldValues, type Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodType } from 'zod'
import { toFieldErrors } from '@/utilities/forms/server-field-errors.utility'

/** react-hook-form + zod, plus server field errors mapped onto the inputs after a failed submit. */
export const useGenericForm = <TValues extends FieldValues>(
  schema: ZodType<TValues, TValues>,
  defaultValues: DefaultValues<TValues>,
  fieldNames: Path<TValues>[],
  onSubmit: (values: TValues) => Promise<unknown>
) => {
  const form = useForm<TValues>({ resolver: zodResolver(schema), defaultValues })

  const submit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      const fieldErrors = toFieldErrors(error, fieldNames)
      for (const [name, message] of Object.entries(fieldErrors)) {
        form.setError(name as Path<TValues>, { type: 'server', message: message as string })
      }
    }
  })

  return { control: form.control, errors: form.formState.errors, isSubmitting: form.formState.isSubmitting, submit }
}
