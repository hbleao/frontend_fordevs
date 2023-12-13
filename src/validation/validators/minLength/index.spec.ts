import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '.'

export const makeSut = () => {
  const sut = new MinLengthValidation('field', 5)

  return {
    sut,
  }
}

describe('MinLengthValidation', () => {
  it('should returns error if value is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate('abc')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should returns false if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate('abcdef')
    expect(error).toBeFalsy()
  })
})
