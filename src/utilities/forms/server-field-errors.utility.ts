import { toApiError } from '../errors/api-error.utility'

const BODY_PREFIX = 'body.'

/**
 * Maps server validation details (`body.email`) onto form field names.
 * Returns the field errors that belong to the given fields, keyed by field name.
 */
export const toFieldErrors = <TName extends string>(error: unknown, fieldNames: readonly TName[]) => {
  const errors: Partial<Record<TName, string>> = {}
  for (const detail of toApiError(error).details) {
    const name = detail.field.startsWith(BODY_PREFIX) ? detail.field.slice(BODY_PREFIX.length) : detail.field
    if ((fieldNames as readonly string[]).includes(name)) errors[name as TName] = detail.message
  }
  return errors
}
