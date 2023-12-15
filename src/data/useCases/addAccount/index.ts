import { AddAccount, AddAccountParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { EmailInUseError } from '@/domain/errors'

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
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        return null
    }
  }
}
