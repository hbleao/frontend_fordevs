import { faker } from '@faker-js/faker'

import { AuthenticationParams } from '@/domain/useCases'
import { AccountModel } from '../models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccount = (): AccountModel => ({
  accessToken: faker.lorem.text(),
})