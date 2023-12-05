import { RemoteAuthentication } from './remoteAuthentication'
import { HttpClientSpy } from '../../test/mockHttpClient'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpClientSpy
}

const makeSut = (url = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAuthentication', () => {
  const url = 'any_url'
  it('should call HttpPostClient with correct URL', () => {
    const { sut, httpPostClientSpy } = makeSut()

    sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
