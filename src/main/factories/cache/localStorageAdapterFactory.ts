import { SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
