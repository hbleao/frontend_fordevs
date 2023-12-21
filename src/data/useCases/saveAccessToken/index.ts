import { SetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { SaveAccessToken } from '@/domain/useCases'

export class LocalSaveAccessToken implements SaveAccessToken {
  public setStorage: SetStorage

  constructor(setStorage: SetStorage) {
    this.setStorage = setStorage
  }

  async save(accessToken: string): Promise<void> {
    if (accessToken === undefined) {
      throw new UnexpectedError()
    }
    await this.setStorage.set('accessToken', accessToken)
  }
}
