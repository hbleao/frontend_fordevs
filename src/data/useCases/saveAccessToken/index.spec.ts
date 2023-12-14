import { SetStorageSpy } from '@/domain/test'
import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from '.'

export const makeSut = () => {
  const setStorage = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorage)

  return {
    sut,
    setStorage,
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorage } = makeSut()
    const accessToken = faker.word.sample()
    await sut.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
