import { HttpPostClient } from '../../../data/protocols/http/httpPostClient'
import { AuthenticationParams } from '../../../domain/useCases/authentication'

export class RemoteAuthentication {
  private url: string
  private httpPostClient: HttpPostClient

  constructor(url: string, httpPostClient: HttpPostClient) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    })
  }
}
