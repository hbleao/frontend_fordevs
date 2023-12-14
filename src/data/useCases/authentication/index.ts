import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/useCases/authentication'

export class RemoteAuthentication implements Authentication {
  private url: string
  private httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>

  constructor(
    url: string,
    httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>,
  ) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}
