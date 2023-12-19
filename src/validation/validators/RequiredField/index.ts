import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  field: string

  constructor(fieldName: string) {
    this.field = fieldName
  }

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
