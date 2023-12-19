import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '../requiredField'
import { EmailValidation } from '../email/emailValidation'
import { MinLengthValidation } from '../minLength'
import { CompareFieldsValidation } from '../compareFields'

export class ValidationBuilder {
  private fieldName: string
  private validations: FieldValidation[]

  private constructor(fieldName: string, validations: FieldValidation[]) {
    this.fieldName = fieldName
    this.validations = validations
  }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  minLength(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare),
    )
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
