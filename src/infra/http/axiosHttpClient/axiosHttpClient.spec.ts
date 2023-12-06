import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axiosHttpClient'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  it('should call axios with correct url', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockAxios).toHaveBeenCalledWith(url)
  })
})
