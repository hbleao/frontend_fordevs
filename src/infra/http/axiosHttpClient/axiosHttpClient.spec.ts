import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpAdapterClient } from './axiosHttpClient'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const mockedResult = {
  data: {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  },
  status: faker.number.int(),
}
mockAxios.post.mockResolvedValue(mockedResult)

const makeSut = () => {
  const sut = new AxiosHttpAdapterClient()

  return {
    sut,
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
    const { sut } = makeSut()
    await sut.post(request)
    expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', async () => {
    const request = factoryPostRequest()
    const { sut } = makeSut()
    const httpResponse = await sut.post(request)

    expect(httpResponse).toEqual({
      statusCode: mockedResult.status,
      body: mockedResult.data,
    })
  })
})
