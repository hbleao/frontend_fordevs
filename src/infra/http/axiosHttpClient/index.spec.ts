import { faker } from '@faker-js/faker'
import axios from 'axios'

import { AxiosHttpAdapterClient } from '.'

import { HttpPostParams } from '@/data/protocols/http'
import { mockAxios, mockHttpResponse } from '@/infra/test'

jest.mock('axios')

type MakeSutProps = {
  sut: AxiosHttpAdapterClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): MakeSutProps => {
  const sut = new AxiosHttpAdapterClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios,
  }
}

const factoryPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  },
})

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = factoryPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(factoryPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  it('should return the correct statusCode and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    })

    const promise = sut.post(factoryPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
