import { RemoteAuthentication } from './remoteAuthentication'
import { HttpClientSpy } from '../../test/mockHttpClient'

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
