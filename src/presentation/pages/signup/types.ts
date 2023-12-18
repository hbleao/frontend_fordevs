import { AddAccount } from '@/domain/useCases'
import { Validation } from '@/presentation/protocols'

export type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
  // authentication: Authentication
  // saveAccessToken: SaveAccessToken
}
