import { useState } from 'react'

export type Params = {
  email: string
  password: string
}

export const useLogin = () => {
  const [isFetchingLogin, setIsFetchingLogin] = useState(false)
  const [loginData, setIsLoginData] = useState(false)
  const [errorMessageLogin, setErrorMessageLogin] = useState('')

  function handleSubmitLogin({ email, password }: Params) {
    try {
      setIsFetchingLogin(true)

      setTimeout(() => {
        console.log('chamando api...')
      }, 2000)

      console.log(email, password)
    } catch (error: any) {
      console.error(error)
      setErrorMessageLogin(error.message)
    } finally {
      setIsFetchingLogin(false)
    }
  }

  return {
    isFetchingLogin,
    loginData,
    errorMessageLogin,
    handleSubmitLogin,
  }
}
