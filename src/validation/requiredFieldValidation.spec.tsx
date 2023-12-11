import { faker } from '@faker-js/faker'

import { RequiredFieldError } from './errors'
import { RequiredFieldValidation } from './requiredFieldValidation'

export const makeSut = () => {
  const sut = new RequiredFieldValidation('email')

  return {
    sut,
  }
}

describe('RequiredFieldValidation', () => {
  it('should return error if field empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.password())
    expect(error).toBeFalsy()
  })
})
