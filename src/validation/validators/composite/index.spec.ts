import { FieldValidationSpy } from '../test/mockFieldValidation'
import { ValidationComposite } from '.'

const makeSut = () => {
  const fieldValidationSpy = new FieldValidationSpy('any_field')
  const fieldValidationSpy2 = new FieldValidationSpy('any_field')

  fieldValidationSpy.error = new Error('any_massage')

  const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])

  return {
    sut,
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_massage')
  })
})
