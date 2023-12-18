import { Validation } from '@/presentation/protocols'
import { ValidationErrors } from './types'

export function isValidFields(
  validation: Validation,
  fields: ValidationErrors,
) {
  const fieldNames = Object.keys(fields)
  let errors: ValidationErrors = {}

  for (const name of fieldNames) {
    const error = validation.validate(name, fields[`${name}`])
    errors = {
      ...errors,
      [`${name}`]: error || '',
    }
  }

  return errors
}
