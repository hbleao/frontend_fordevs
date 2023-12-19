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
import { SignUpProps } from './types'
import { isValidFields } from '@/presentation/helpers'

export const SignUp = ({
  validation,
  addAccount,
  saveAccessToken,
}: SignUpProps) => {
  const navigate = useNavigate()
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

  async function handleSubmit(e: FormEvent) {
    if (isSubmitLoading) return
    e.preventDefault()
    try {
      setIsSubmitLoading(true)

      const account = await addAccount.add({
        name: field.name,
        email: field.email,
        password: field.password,
        passwordConfirmation: field.passwordConfirmation,
      })

      await saveAccessToken.save(account.accessToken)

      navigate('/')
    } catch (error) {
      setMessageLoginServiceError(error.message)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  useEffect(() => {
    validateFieldErrors()
  }, [field.name, field.email, field.password, field.passwordConfirmation])

  return (
    <div className={S.signup}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form} onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          data-testid="signupButton"
          disabled={
            !!fieldErrors.name ||
            !!fieldErrors.email ||
            !!fieldErrors.password ||
            !!fieldErrors.passwordConfirmation
          }
        >
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
