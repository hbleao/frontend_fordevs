import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Login } from '.'
import { faker } from '@faker-js/faker'
import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  private errorMessage: string
  public input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

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

    expect(validationSpy.input).toEqual({
      email: fakeEmail,
    })
  })

  it('should call validation with correct password value', () => {
    const { validationSpy } = makeSut()
    const password = screen.getByTestId('password')

    const fakePassword = faker.internet.password()

    fireEvent.input(password, { target: { value: fakePassword } })

    expect(validationSpy.input).toEqual({
      password: fakePassword,
    })
  })
})
