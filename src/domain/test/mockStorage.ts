import { SetStorage } from '@/data/protocols'

export class SetStorageSpy implements SetStorage {
  public key: string
  public value: string

  async set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}
