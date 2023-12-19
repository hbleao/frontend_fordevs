import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  field: string
  private fieldToCompare: string

  constructor(field: string, fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate(input: object): Error {
    return input[this.field] === input[this.fieldToCompare]
      ? null
      : new InvalidFieldError()
  }
}
