import {
  HttpPostClient,
  HttpPostParams,
} from 'data/protocols/http/httpPostClient'

export class HttpClientSpy implements HttpPostClient {
  public url?: string

  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}
