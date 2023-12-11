import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import { Login } from '.'

import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'
import { BrowserRouter } from 'react-router-dom'

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password(),
) => {
  const emailElement = screen.getByTestId('email')
  const passwordElement = screen.getByTestId('password')
  const submitButton = screen.getByTestId('loginButton')

  fireEvent.input(emailElement, { target: { value: email } })
  fireEvent.input(passwordElement, { target: { value: password } })
  fireEvent.click(submitButton)
}

const populateField = (name: string, value: string) => {
  const field = screen.getByTestId(name)
  fireEvent.input(field, { target: { value } })

  return { field }
}

type MakeSutProps = {
  validationSpyError?: boolean
}

const makeSut = ({ validationSpyError = false }: MakeSutProps) => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const fakeErrorMessage = faker.lorem.words()

  validationSpy.errorMessage = validationSpyError ? fakeErrorMessage : null

  const sut = render(
    <BrowserRouter>
      <Login validation={validationSpy} authentication={authenticationSpy} />,
    </BrowserRouter>,
  )

  return {
    sut,
    validationSpy,
    authenticationSpy,
  }
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should start with initial state', async () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const spinner = screen.queryByTestId('spinner')
    expect(spinner).not.toBeInTheDocument()

    const button = screen.getByTestId('loginButton') as HTMLButtonElement
    expect(button.disabled).toBe(true)

    waitFor(() => {
      const email = screen.getByTestId('email-error')
      expect(email.textContent).toBe(validationSpy.errorMessage)

      const password = screen.getByTestId('password-error')
      expect(password.textContent).toBe(validationSpy.errorMessage)
    })
  })

  it('should call validation with correct email value', () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const fakeEmail = faker.internet.email()

    populateField('email', fakeEmail)

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(fakeEmail)
  })

  it('should call validation with correct password value', () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const fakePassword = faker.internet.password()

    populateField('password', fakePassword)

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(fakePassword)
  })

  it('should show email error if validation fails', () => {
    makeSut({ validationSpyError: true })
    const fakeEmail = faker.internet.email()

    const { field } = populateField('email', fakeEmail)

    waitFor(() => {
      const errorMessage = screen.getByTestId('email-error')
      expect(field.textContent).toBe(errorMessage)
    })
  })

  it('should show valid email state if Validation success', () => {
    makeSut({})
    populateField('email', faker.internet.email())

    waitFor(() => {
      const errorMessage = screen.queryByTestId('email-error')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should show password error if validation fails', () => {
    makeSut({ validationSpyError: true })

    const { field } = populateField('password', faker.internet.password())

    waitFor(() => {
      const errorMessage = screen.getByTestId('password-error')
      expect(field.textContent).toBe(errorMessage)
    })
  })

  it('should show valid password state if Validation success', () => {
    makeSut({ validationSpyError: true })
    populateField('password', faker.internet.password())

    waitFor(() => {
      const errorMessage = screen.queryByTestId('password-error')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should enable submit if form is valid', () => {
    makeSut({})
    populateField('email', faker.internet.email())
    populateField('password', faker.internet.password())
    const submitButton = screen.getByTestId('loginButton') as HTMLButtonElement

    waitFor(() => {
      expect(submitButton.disabled).toBe(false)
    })
  })

  it('should enable submit if form is valid', async () => {
    makeSut({})
    simulateValidSubmit()

    await waitFor(() => {
      // const loader = screen.queryByTestId('loader')
      // expect(loader).toBeInTheDocument()
    })
  })

  it('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut({})
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)

    waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password,
      })
    })
  })

  it('should add access token to localstorage on success', async () => {
    const { authenticationSpy } = makeSut({ validationSpyError: null })
    simulateValidSubmit()
    await waitFor(() => screen.queryByTestId('loader'))
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    )
  })
})
