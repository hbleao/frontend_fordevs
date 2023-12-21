import { SetStorageSpy } from '@/domain/test'
import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from '.'
import { UnexpectedError } from '@/domain/errors'

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

  it('should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
