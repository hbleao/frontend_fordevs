import { faker } from '@faker-js/faker'
import { ValidationComposite } from '.'

import { FieldValidationSpy } from '../../test/mockFieldValidation'

const makeSut = (fieldName: string) => {
  const validationSpy = new FieldValidationSpy(fieldName)
  const validationSpy2 = new FieldValidationSpy(fieldName)
  validationSpy.error = new Error('any_massage')

  const fieldValidationSpy = [validationSpy, validationSpy2]

  const sut = ValidationComposite.build(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy,
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate(field, { [field]: faker.internet.email() })
    expect(error).toBe('any_massage')
  })
})
