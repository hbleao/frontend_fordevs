import { Authentication, SaveAccessToken } from '@/domain/useCases'
import { Validation } from '@/presentation/protocols'

export type SignUpProps = {
  validation: Validation
  // authentication: Authentication
  // saveAccessToken: SaveAccessToken
}
