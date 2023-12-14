import { LocalSaveAccessToken } from '@/data/useCases'
import { SaveAccessToken } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeLocalAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
