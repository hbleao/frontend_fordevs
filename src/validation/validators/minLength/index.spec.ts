import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  field: string
  minLength: number

  constructor(field: string, minLength: number) {
    this.field = field
    this.minLength = minLength
  }

  validate(value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}

export const makeSut = () => {
  const sut = new MinLengthValidation('field', 5)

  return {
    sut,
  }
}

describe('MinLengthValidation', () => {
  it('should returns error if value is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate('2')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should returns false if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate('10')
    expect(error).toEqual(new InvalidFieldError())
  })
})
