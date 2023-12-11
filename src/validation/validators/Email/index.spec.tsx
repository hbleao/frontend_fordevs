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
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
