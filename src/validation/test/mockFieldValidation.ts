import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  field: string
  error: Error = null
  value: string

  constructor(field: string) {
    this.field = field
  }

  validate(value: string): Error {
    this.value = value
    return this.error
  }
}
