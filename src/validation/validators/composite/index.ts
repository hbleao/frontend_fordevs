import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  validators: FieldValidation[]

  constructor(validators: FieldValidation[]) {
    this.validators = validators
  }

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(
      (validator) => validator.field === fieldName,
    )

    for (const validator of validators) {
      const error = validator.validate(fieldValue)

      if (error) {
        return error.message
      }
    }

    return null
  }
}
