import { faker } from '@faker-js/faker'

import { AddAccountParams } from '../useCases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  }
}
