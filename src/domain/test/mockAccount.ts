import { faker } from '@faker-js/faker'

import { AuthenticationParams } from '@/domain/useCases/authentication'
import { AccountModel } from '../models/accoutModels'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccount = (): AccountModel => ({
  accessToken: faker.lorem.text(),
})
