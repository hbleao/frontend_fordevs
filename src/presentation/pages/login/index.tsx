import React, { useState } from 'react'

import S from './styles.scss'
import {
  Button,
  Footer,
  FormStatus,
  Header,
  Input,
} from '@/presentation/components'

import { useLogin } from '@/presentation/hooks'

export const Login = () => {
  const { isFetchingLogin, handleSubmitLogin, errorMessageLogin } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    handleSubmitLogin({ email, password })
  }

  return (
    <div className={S.login}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form} onSubmit={handleSubmit}>
        <h2>Ajude a comunidade com seu conhecimento</h2>
        <Input type="email" placeholder="digite seu email" />
        <Input type="password" placeholder="digite sua senha" />
        <Button type="submit">Logar</Button>
        <span className={S.createAccount}>Criar conta</span>
        <FormStatus
          errorMessage={errorMessageLogin}
          isLoading={isFetchingLogin}
        />
      </form>
      <Footer />
    </div>
  )
}
