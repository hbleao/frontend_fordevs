import React from 'react'

import { SignUp } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const MakeSignUp = () => {
  // const url = makeApiUrl('/signup')
  // const axiosHttpClient = new AxiosHttpAdapterClient()
  // const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

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
      // saveAccessToken={makeLocalAccessToken()}
    />
  )
}
