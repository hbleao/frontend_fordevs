import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '.'

export const makeSut = (field: string) => {
  const sut = new RequiredFieldValidation(field)

  return {
    sut,
  }
}

describe('RequiredFieldValidation', () => {
  it('should return error if field empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.word.sample() })
    expect(error).toBeFalsy()
  })
})
