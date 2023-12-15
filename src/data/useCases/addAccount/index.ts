import { AddAccount, AddAccountParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { HttpPostClient } from '@/data/protocols'

export class RemoteAddAccount implements AddAccount {
  url: string
  httpPostClient: HttpPostClient<AddAccountParams, AccountModel>

  constructor(
    url: string,
    httpPostClient: HttpPostClient<AddAccountParams, AccountModel>,
  ) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    return null
  }
}
