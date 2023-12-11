import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import S from './styles.scss'

import {
  Button,
  Footer,
  FormStatus,
  Header,
  Input,
} from '@/presentation/components'

import { LoginProps } from './types'

export const Login = ({ validation, authentication }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageLoginServiceError, setMessageLoginServiceError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault()
      setIsLoading(true)

      if (isLoading) return

      const account = await authentication.auth({
        email,
        password,
      })

      localStorage.setItem('accessToken', account.accessToken)
      navigate('/')
    } catch (error) {
      setMessageLoginServiceError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    validation.validate('email', email)
    setFieldErrors({
      ...fieldErrors,
      email: validation.validate('email', email),
    })
  }, [email])

  useEffect(() => {
    validation.validate('password', password)
    setFieldErrors({
      ...fieldErrors,
      email: validation.validate('password', password),
    })
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
        <Button
          type="submit"
          data-testid="loginButton"
          disabled={!!fieldErrors.email || !!fieldErrors.password}
        >
          Logar
        </Button>
        <Link
          to="/signup"
          className={S.createAccount}
          data-testid="signup-button"
        >
          Criar conta
        </Link>
        <FormStatus
          errorMessage={messageLoginServiceError}
          isLoading={isLoading}
        />
      </form>
      <Footer />
    </div>
  )
}
