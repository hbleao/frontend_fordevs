import { faker } from '@faker-js/faker'

import { RemoteAuthentication } from './remoteAuthentication'
import { HttpClientSpy } from '../../test/mockHttpClient'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAuthentication', () => {
  const url = faker.internet.url()
  it('should call HttpPostClient with correct URL', () => {
    const { sut, httpPostClientSpy } = makeSut(url)

    sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
