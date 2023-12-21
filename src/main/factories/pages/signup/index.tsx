import React from 'react'

import { SignUp } from '@/presentation/pages'
import { RemoteAddAccount } from '@/data/useCases/addAccount'
import { makeApiUrl, makeLocalAccessToken } from '@/main/factories/http'
import { AxiosHttpAdapterClient } from '@/infra/http/axiosHttpClient'
import {
  ValidationBuilder as Builder,
  ValidationComposite,
} from '@/validation/validators'

export const MakeSignUp = () => {
  const url = makeApiUrl('/signup')
  const axiosHttpClient = new AxiosHttpAdapterClient()
  const remoteAddAccount = new RemoteAddAccount(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...Builder.field('name').required().minLength(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().minLength(5).build(),
    ...Builder.field('passwordConfirmation')
      .required()
      .sameAs('password')
      .build(),
  ])

  return (
    <SignUp
      validation={validationComposite}
      addAccount={remoteAddAccount}
      saveAccessToken={makeLocalAccessToken()}
    />
  )
}
