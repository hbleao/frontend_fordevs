import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '.'
import { faker } from '@faker-js/faker'

export const makeSut = (field: string) => {
  const sut = new MinLengthValidation(field, 5)

  return {
    sut,
  }
}

describe('MinLengthValidation', () => {
  it('should returns error if value is invalid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: 'abc' })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should returns false if value is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: 'abcdef' })
    expect(error).toBeFalsy()
  })
})
