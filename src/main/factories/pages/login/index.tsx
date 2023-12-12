import React from 'react'

import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/useCases/authentication/remoteAuthentication'
import { AxiosHttpAdapterClient } from '@/infra/http/axiosHttpClient/axiosHttpClient'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const MakeLogin = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpAdapterClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
