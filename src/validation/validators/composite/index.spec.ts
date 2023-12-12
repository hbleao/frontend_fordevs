import { FieldValidationSpy } from '../../test/mockFieldValidation'
import { ValidationComposite } from '.'

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
    const { sut } = makeSut('any_field')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_massage')
  })
})
