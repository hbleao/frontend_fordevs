import { Authentication } from '@/domain/useCases'
import { Validation } from '@/presentation/protocols'

export type LoginProps = {
  validation: Validation
  authentication: Authentication
}
