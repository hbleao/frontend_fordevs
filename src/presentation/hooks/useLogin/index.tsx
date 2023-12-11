import { useState } from 'react'

export type Params = {
  email: string
  password: string
}

export const useLogin = () => {
  const [isFetchingLogin, setIsFetchingLogin] = useState(false)
  const [login, setLogin] = useState({})
  const [errorMessageLogin, setErrorMessageLogin] = useState('')

  function handleSubmitLogin({ email, password }: Params) {
    try {
      setIsFetchingLogin(true)

      // setTimeout(() => {
      //   console.log('chamando api...')
      // }, 2000)

      setLogin({
        data: [] as any,
      })
    } catch (error: any) {
      console.error(error)
      setErrorMessageLogin(error.message)
    } finally {
      setIsFetchingLogin(false)
    }
  }

  return {
    isFetchingLogin,
    login,
    errorMessageLogin,
    handleSubmitLogin,
  }
}
