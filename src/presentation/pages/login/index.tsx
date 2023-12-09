import React, { useEffect, useState } from 'react'

import S from './styles.scss'
import {
  Button,
  Footer,
  FormStatus,
  Header,
  Input,
} from '@/presentation/components'

import { useLogin } from '@/presentation/hooks'

import { LoginProps } from './types'

export const Login = ({ validation }: LoginProps) => {
  const { isFetchingLogin, handleSubmitLogin, errorMessageLogin } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  })

  function handleSubmit() {
    handleSubmitLogin({ email, password })
  }

  useEffect(() => {
    validation.validate({ email })
  }, [email])

  useEffect(() => {
    validation.validate({ password })
  }, [password])

  return (
    <div className={S.login}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form} onSubmit={handleSubmit}>
        <h2>Ajude a comunidade com seu conhecimento</h2>
        <Input
          type="email"
          name="email"
          placeholder="digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={fieldErrors.password}
        />
        <Button type="submit" data-testid="loginButton" disabled>
          Logar
        </Button>
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
