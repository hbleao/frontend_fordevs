import { HttpPostClient } from 'data/protocols/http/httpPostClient'

export class HttpClientSpy implements HttpPostClient {
  public url?: string

  async post(url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}
