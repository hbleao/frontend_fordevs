import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SignUp } from '.'
import { BrowserRouter } from 'react-router-dom'
import { ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type MakeSutProps = {
  validationSpyError?: boolean
  authenticationSpyError?: boolean
}

const makeSut = ({ validationSpyError = false }: MakeSutProps) => {
  const validationSpy = new ValidationSpy()
  const fakeErrorMessage = faker.lorem.words()
  validationSpy.errorMessage = validationSpyError ? fakeErrorMessage : null

  const sut = render(
    <BrowserRouter>
      <SignUp validation={validationSpy} />
    </BrowserRouter>,
  )

  return {
    sut,
    validationSpy,
  }
}

const populateField = (name: string, value: string) => {
  const field = screen.getByTestId(name)
  fireEvent.input(field, { target: { value } })

  return { field }
}

const getFieldError = (errorName: string) => {
  const ElementError = screen.queryByTestId(errorName)
  expect(ElementError).toBeInTheDocument()
}

describe('SignUp', () => {
  it('should start with initial state', async () => {
    makeSut({})

    const loader = screen.queryByTestId('loader')
    expect(loader).not.toBeInTheDocument()

    const errorMessage = screen.queryByTestId('error-message')
    expect(errorMessage).not.toBeInTheDocument()

    waitFor(() => {
      getFieldError('name-error')
      getFieldError('email-error')
      getFieldError('password-error')
      getFieldError('passwordConfirmation-error')
    })

    const button = screen.getByTestId('signup-button') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('should call validation with correct name value', () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const fakeName = ''

    populateField('name', fakeName)

    const name = screen.getByTestId('name-error')
    expect(name.textContent).toBe(validationSpy.errorMessage)
  })

  it('should call validation with correct email value', () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const fakeEmail = ''

    populateField('email', fakeEmail)

    const name = screen.getByTestId('email-error')
    expect(name.textContent).toBe(validationSpy.errorMessage)
  })

  it('should call validation with correct password value', () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const fakePassword = ''

    populateField('password', fakePassword)

    const name = screen.getByTestId('password-error')
    expect(name.textContent).toBe(validationSpy.errorMessage)
  })

  it('should call validation with correct passwordConfirmation value', () => {
    const { validationSpy } = makeSut({ validationSpyError: true })
    const fakePasswordConfirmation = ''

    populateField('passwordConfirmation', fakePasswordConfirmation)

    const name = screen.getByTestId('passwordConfirmation-error')
    expect(name.textContent).toBe(validationSpy.errorMessage)
  })
})
