import { AddAccount, SaveAccessToken } from '@/domain/useCases'
import { Validation } from '@/presentation/protocols'

export type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}
