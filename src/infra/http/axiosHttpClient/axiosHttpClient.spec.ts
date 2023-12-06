import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axiosHttpClient'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const makeSut = () => {
  const sut = new AxiosHttpClient()

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
})
