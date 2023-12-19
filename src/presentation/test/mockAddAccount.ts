import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/useCases'
import { mockAccount } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  public account = mockAccount()
  public params: AddAccountParams
  public callsCount = 0

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return this.account
  }
}
