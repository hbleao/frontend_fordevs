import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  field: string

  validate(value: string): Error {
    return new InvalidFieldError()
  }
}
