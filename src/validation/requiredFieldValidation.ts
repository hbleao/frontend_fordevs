import { RequiredFieldError } from './errors'
import { FieldValidation } from './protocols'

export class RequiredFieldValidation implements FieldValidation {
  field: string

  constructor(fieldName: string) {
    this.field = fieldName
  }

  validate(value: string): Error {
    return new RequiredFieldError()
  }
}
