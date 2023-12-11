import { faker } from '@faker-js/faker'
import { EmailValidation } from './emailValidation'
import { InvalidFieldError } from '@/validation/errors'

export const makeSut = () => {
  const sut = new EmailValidation()

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
})
