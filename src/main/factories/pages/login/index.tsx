import React from 'react'

import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/useCases/authentication'
import { AxiosHttpAdapterClient } from '@/infra/http/axiosHttpClient'
import {
  ValidationBuilder as Builder,
  ValidationComposite,
} from '@/validation/validators'
import { makeApiUrl } from '../../http'
import { makeLocalAccessToken } from '../../http/localSaveAccessTokenFactory'

export const MakeLogin = () => {
  const url = makeApiUrl('/login')
  const axiosHttpClient = new AxiosHttpAdapterClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().minLength(5).build(),
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
      saveAccessToken={makeLocalAccessToken()}
    />
  )
}
