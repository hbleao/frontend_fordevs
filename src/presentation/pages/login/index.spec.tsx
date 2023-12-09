import React from 'react'
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { faker } from '@faker-js/faker'

import { Login } from '.'

import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'

const simulateValidSubmit = (
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password(),
) => {
  const email = screen.getByTestId('email')
  const password = screen.getByTestId('password')
  const submitButton = screen.getByTestId('loginButton')

  fireEvent.input(email, { target: { value: fakeEmail } })
  fireEvent.input(password, { target: { value: fakePassword } })
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
    <Login validation={validationSpy} authentication={authenticationSpy} />,
  )

  return {
    sut,
    validationSpy,
    authenticationSpy,
  }
}

describe('Login', () => {
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

  it('should enable submit if form is valid', () => {
    makeSut({})
    simulateValidSubmit()

    waitFor(() => {
      const loader = screen.getByTestId('loader')
      expect(loader).toBeInTheDocument()
    })
  })

  it('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut({})
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    simulateValidSubmit(fakeEmail, fakePassword)

    waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        fakeEmail,
        fakePassword,
      })
    })
  })
})
