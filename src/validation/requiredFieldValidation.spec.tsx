import { faker } from '@faker-js/faker'
import { RequiredFieldError } from './errors'
import { RequiredFieldValidation } from './requiredFieldValidation'

describe('RequiredFieldValidation', () => {
  it('should return error if field empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.internet.password())
    expect(error).toBeFalsy()
  })
})
