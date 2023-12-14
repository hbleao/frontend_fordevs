import { SetStorage } from '@/data/protocols'
import { SaveAccessToken } from '@/domain/useCases'

export class LocalSaveAccessToken implements SaveAccessToken {
  public setStorage: SetStorage

  constructor(setStorage: SetStorage) {
    this.setStorage = setStorage
  }

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
