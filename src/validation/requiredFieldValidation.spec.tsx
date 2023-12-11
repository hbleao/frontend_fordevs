import { RequiredFieldError } from './errors'
import { RequiredFieldValidation } from './requiredFieldValidation'

describe('RequiredFieldValidation', () => {
  it('should return error if field empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
