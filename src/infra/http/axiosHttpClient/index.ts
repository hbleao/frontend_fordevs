import axios from 'axios'

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http'

export class AxiosHttpAdapterClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    try {
      const httpResponse = await axios.post(params.url, params.body)
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data,
      }
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data,
      }
    }
  }
}
