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

import { isValidFields } from '@/presentation/helpers'

import { LoginProps } from './types'

export const Login = ({
  validation,
  authentication,
  saveAccessToken,
}: LoginProps) => {
  const [field, setField] = useState({
    email: '',
    password: '',
  })
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
        email: field.email,
        password: field.password,
      })

      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setMessageLoginServiceError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function validateFieldErrors() {
    const errors = isValidFields(validation, field) as any

    setFieldErrors(errors)
  }

  useEffect(() => {
    validateFieldErrors()
  }, [field.email, field.password])

  return (
    <div className={S.login}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form} onSubmit={handleSubmit}>
        <h2>Ajude a comunidade com seu conhecimento</h2>
        <Input
          type="email"
          name="email"
          label="Digite seu email"
          value={field.email}
          onChange={(e) => setField({ ...field, email: e.target.value })}
          errorMessage={fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          label="Digite sua senha"
          value={field.password}
          onChange={(e) => setField({ ...field, password: e.target.value })}
          errorMessage={fieldErrors.password}
        />
        <Button
          type="submit"
          data-testid="submit-button"
          disabled={!!fieldErrors.email || !!fieldErrors.password || isLoading}
        >
          Logar
        </Button>
        <Link
          to="/signup"
          className={S.createAccount}
          data-testid="goto-signup"
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
