import { faker } from '@faker-js/faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './emailValidation'

export const makeSut = () => {
  const sut = new EmailValidation('any_value')

  return {
    sut,
  }
}

describe('Emailvalidation', () => {
  it('should return if email is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.word.sample())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
