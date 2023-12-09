import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { faker } from '@faker-js/faker'

import { Login } from '.'

import { ValidationSpy } from '@/presentation/test'

const makeSut = () => {
  const validationSpy = new ValidationSpy()
  const fakeErrorMessage = faker.lorem.words()

  validationSpy.errorMessage = fakeErrorMessage

  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy,
  }
}

describe('Login', () => {
  it('should start with initial state', async () => {
    const { validationSpy } = makeSut()
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
    const { validationSpy } = makeSut()
    const email = screen.getByTestId('email')
    const fakeEmail = faker.internet.email()

    fireEvent.input(email, { target: { value: fakeEmail } })

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(fakeEmail)
  })

  it('should call validation with correct password value', () => {
    const { validationSpy } = makeSut()
    const password = screen.getByTestId('password')
    const fakePassword = faker.internet.password()

    fireEvent.input(password, { target: { value: fakePassword } })

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(fakePassword)
  })

  it('should show email error if validation fails', () => {
    const { validationSpy } = makeSut()
    const email = screen.getByTestId('email')
    const fakeEmail = faker.internet.email()
    const fakeErrorMessage = faker.lorem.words()
    validationSpy.errorMessage = fakeErrorMessage

    fireEvent.input(email, { target: { value: fakeEmail } })

    waitFor(() => {
      const errorMessage = screen.getByTestId('email-error')
      expect(email.textContent).toBe(errorMessage)
    })
  })

  it('should show valid email state if Validation success', () => {
    const { validationSpy } = makeSut()
    const email = screen.getByTestId('email')
    const fakeEmail = faker.internet.email()
    validationSpy.errorMessage = ''

    fireEvent.input(email, { target: { value: fakeEmail } })

    waitFor(() => {
      const errorMessage = screen.queryByTestId('email-error')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should show password error if validation fails', () => {
    const { validationSpy } = makeSut()
    const password = screen.getByTestId('password')
    const fakePassword = faker.internet.password()
    const fakeErrorMessage = faker.lorem.words()
    validationSpy.errorMessage = fakeErrorMessage

    fireEvent.input(password, { target: { value: fakePassword } })

    waitFor(() => {
      const errorMessage = screen.getByTestId('password-error')
      expect(password.textContent).toBe(errorMessage)
    })
  })

  it('should show valid password state if Validation success', () => {
    const { validationSpy } = makeSut()
    const password = screen.getByTestId('password')
    const fakePassword = faker.internet.password()
    const fakeErrorMessage = faker.lorem.words()
    validationSpy.errorMessage = fakeErrorMessage

    fireEvent.input(password, { target: { value: fakePassword } })

    waitFor(() => {
      const errorMessage = screen.queryByTestId('password-error')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should enable submit if form is valid', () => {
    const { validationSpy } = makeSut()
    const email = screen.getByTestId('email')
    const password = screen.getByTestId('password')
    const submitButton = screen.getByTestId('loginButton') as HTMLButtonElement
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    validationSpy.errorMessage = null

    fireEvent.input(email, { target: { value: fakeEmail } })
    fireEvent.input(password, { target: { value: fakePassword } })

    waitFor(() => {
      expect(submitButton.disabled).toBe(false)
    })
  })
})