import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  field: string
  private valueToCompare: string

  constructor(field: string, valueToCompare: string) {
    this.field = field
    this.valueToCompare = valueToCompare
  }

  validate(value: string): Error {
    return value === this.valueToCompare ? null : new InvalidFieldError()
  }
}
