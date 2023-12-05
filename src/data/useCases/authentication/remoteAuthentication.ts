import { HttpPostClient } from 'data/protocols/http/httpPostClient'

export class RemoteAuthentication {
  private url: string
  private httpPostClient: HttpPostClient

  constructor(url: string, httpPostClient: HttpPostClient) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async auth(): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
    })
  }
}
