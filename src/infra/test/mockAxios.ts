import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue({
    data: {
      companyName: faker.company.name(),
      phrase: faker.company.catchPhrase(),
    },
    status: faker.number.int(),
  })

  return mockedAxios
}
