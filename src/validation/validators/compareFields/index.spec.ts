import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '.'

export const makeSut = (field: string, fieldToCompare: string) => {
  const sut = new CompareFieldsValidation(field, fieldToCompare)

  return {
    sut,
  }
}

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.word.sample()

    const { sut } = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: value, [fieldToCompare]: '' })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.word.sample()
    const { sut } = makeSut(field, fieldToCompare)

    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    })

    expect(error).toBeFalsy()
  })
})
