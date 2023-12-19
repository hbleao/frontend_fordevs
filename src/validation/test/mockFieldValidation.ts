import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  field: string
  error: Error = null
  input: object

  constructor(field: string) {
    this.field = field
  }

  validate(input: object): Error {
    this.input = input
    return this.error
  }
}
