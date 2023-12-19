import { faker } from '@faker-js/faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './emailValidation'

export const makeSut = (field: string) => {
  const sut = new EmailValidation(field)

  return {
    sut,
  }
}

describe('EmailValidation', () => {
  it('should return if email is invalid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.word.sample() })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
