import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '.'

export const makeSut = (field: string, valueToCompare: string) => {
  const sut = new CompareFieldsValidation(field, valueToCompare)

  return {
    sut,
  }
}

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const value = faker.word.sample()
    const valueToCompare = faker.word.sample()
    const { sut } = makeSut('email', valueToCompare)
    const error = sut.validate(value)
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const value = faker.word.sample()
    const { sut } = makeSut('email', value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
