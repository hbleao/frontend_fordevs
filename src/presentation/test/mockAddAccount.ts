import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/useCases'

export class AddAccountSpy implements AddAccount {
  public account
  public params: AddAccountParams
  public callsCount = 0

  add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return this.account
  }
}
