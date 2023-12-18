import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import S from './styles.scss'

import {
  Button,
  Footer,
  FormStatus,
  Header,
  Input,
} from '@/presentation/components'
import { SignUpProps } from './types'
import { isValidFields } from '@/presentation/helpers'

export const SignUp = ({ validation }: SignUpProps) => {
  const [field, setField] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [messageLoginServiceError, setMessageLoginServiceError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  async function validateFieldErrors() {
    const errors = isValidFields(validation, field) as any
    setFieldErrors(errors)
  }

  useEffect(() => {
    validateFieldErrors()
  }, [field.name, field.email, field.password, field.passwordConfirmation])

  return (
    <div className={S.signup}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form}>
        <h2>Crie sua conta</h2>
        <Input
          type="text"
          name="name"
          placeholder="Digite seu nome"
          value={field.name}
          onChange={(e) => setField({ ...field, name: e.target.value })}
          errorMessage={fieldErrors.name}
        />
        <Input
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={field.email}
          onChange={(e) => setField({ ...field, email: e.target.value })}
          errorMessage={fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={field.password}
          onChange={(e) => setField({ ...field, password: e.target.value })}
          errorMessage={fieldErrors.password}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Repita sua senha"
          value={field.passwordConfirmation}
          onChange={(e) =>
            setField({ ...field, passwordConfirmation: e.target.value })
          }
          errorMessage={fieldErrors.passwordConfirmation}
        />
        <Button type="submit" data-testid="signup-button" disabled>
          Criar conta
        </Button>
        <Link
          to="/login"
          className={S.createAccount}
          data-testid="login-button"
        >
          Logar na plataforma
        </Link>
        <FormStatus
          errorMessage={messageLoginServiceError}
          isLoading={isSubmitLoading}
        />
      </form>
      <Footer />
    </div>
  )
}
