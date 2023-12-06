import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axiosHttpClient'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const makeSut = () => {
  const sut = new AxiosHttpClient()

  return {
    sut,
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct url and verb', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut()
    await sut.post({ url })
    expect(mockAxios.post).toHaveBeenCalledWith(url)
  })
})
