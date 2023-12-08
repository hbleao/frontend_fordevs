import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Login } from '.'

const makeSut = () => {
  const sut = render(<Login />)

  return {
    sut,
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
})
