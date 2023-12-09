import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { faker } from '@faker-js/faker'

import { Login } from '.'

import { ValidationSpy } from '@/presentation/test'

const makeSut = () => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy,
  }
}

describe('Login', () => {
  it('should start with initial state', () => {
    makeSut()
    const spinner = screen.queryByTestId('spinner')
    expect(spinner).not.toBeInTheDocument()

    const button = screen.getByTestId('loginButton') as HTMLButtonElement
    expect(button.disabled).toBe(true)

    const email = screen.getByTestId('email-error')
    expect(email.textContent).toBe('Campo obrigatório')

    const password = screen.getByTestId('password-error')
    expect(password.textContent).toBe('Campo obrigatório')
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
})
