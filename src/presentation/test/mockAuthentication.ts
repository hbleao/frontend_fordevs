import { AccountModel } from '@/domain/models'
import { mockAccount } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/useCases'

export class AuthenticationSpy implements Authentication {
  account = mockAccount()
  params: AuthenticationParams
  callsCount = 0
  authenticationError = false

  constructor(authenticationError: boolean) {
    this.authenticationError = authenticationError
  }

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount = this.callsCount + 1
    this.params = params
    return this.authenticationError
      ? Promise.reject(new Error('authentication fails'))
      : Promise.resolve(this.account)
  }
}
