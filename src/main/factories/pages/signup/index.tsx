import React from 'react'

import { SignUp } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { RemoteAddAccount } from '@/data/useCases/addAccount'
import { makeApiUrl } from '../../http'
import { AxiosHttpAdapterClient } from '@/infra/http/axiosHttpClient'

export const MakeSignUp = () => {
  const url = makeApiUrl('/signup')
  const axiosHttpClient = new AxiosHttpAdapterClient()
  // const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const remoteAddAccount = new RemoteAddAccount(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').minLength(5).build(),
  ])

  return (
    <SignUp
      // authentication={remoteAuthentication}
      validation={validationComposite}
      addAccount={remoteAddAccount}
      // saveAccessToken={makeLocalAccessToken()}
    />
  )
}
