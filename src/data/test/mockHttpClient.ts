import {
  HttpPostClient,
  HttpPostParams,
} from 'data/protocols/http/httpPostClient'

export class HttpClientSpy implements HttpPostClient {
  public url?: string
  public body?: object

  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
