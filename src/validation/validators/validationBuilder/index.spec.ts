import { ValidationBuilder } from '.'
import { EmailValidation } from '../email/emailValidation'
import { MinLengthValidation } from '../minLength'
import { RequiredFieldValidation } from '../requiredField'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  it('should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  it('should return MinLengthValidation', () => {
    const validations = ValidationBuilder.field('any_field')
      .minLength(5)
      .build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })

  it('should return a list of validations', () => {
    const validations = ValidationBuilder.field('any_field')
      .required()
      .minLength(5)
      .email()
      .build()

    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new MinLengthValidation('any_field', 5),
      new EmailValidation('any_field'),
    ])
  })
})
