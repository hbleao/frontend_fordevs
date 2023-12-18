import { faker } from '@faker-js/faker'

import { isValidFields } from '.'

import { Validation } from '@/presentation/protocols'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

import { ValidationErrors } from './types'

const makeSut = (validation: Validation, fieldNames: ValidationErrors) => {
  const sut = isValidFields(validation, fieldNames)
  return {
    sut,
  }
}

function getValidationComposite() {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email').required().build(),
  ])
}

describe('Helpers/isValidFields', () => {
  it('should return an error if validations fails', () => {
    const fieldNames = { name: '', email: '' }

    const { sut } = makeSut(getValidationComposite(), fieldNames)

    expect(sut).toEqual({
      name: 'Campo obrigatório',
      email: 'Campo obrigatório',
    })
  })

  it('should returns null if validations is valid', () => {
    const fieldNames = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
    }

    const { sut } = makeSut(getValidationComposite(), fieldNames)

    expect(sut).toEqual({
      name: '',
      email: '',
    })
  })
})
