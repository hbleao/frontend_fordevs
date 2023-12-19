import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'

import { SignUp } from '.'

import {
  AddAccountSpy,
  SaveAccessTokenMock,
  ValidationSpy,
} from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'

type MakeSutProps = {
  validationSpyError?: boolean
  authenticationSpyError?: boolean
  addAccountSpy?: AddAccountSpy
  saveAccessTokenMock?: SaveAccessTokenMock
}

const makeSut = ({ validationSpyError = false }: MakeSutProps) => {
  const validationSpy = new ValidationSpy()
  const fakeErrorMessage = faker.lorem.words()
  validationSpy.errorMessage = validationSpyError ? fakeErrorMessage : null
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
    <BrowserRouter>
      <SignUp
        validation={validationSpy}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </BrowserRouter>,
  )

  return {
    sut,
    validationSpy,
    addAccountSpy,
    saveAccessTokenMock,
  }
}

const populateField = (name: string, value: string) => {
  const field = screen.getByTestId(name)
  fireEvent.input(field, { target: { value } })

  return { field }
}

const getFieldError = async (errorName: string) => {
  waitFor(() => {
    const ElementError = screen.queryByTestId(errorName)
    expect(ElementError).toBeInTheDocument()
  })
}

const simulateSubmitForm = () => {
  const name = faker.person.firstName()
  const email = faker.internet.email()
  const password = faker.internet.password()

  populateField('name', name)
  populateField('email', email)
  populateField('password', password)
  populateField('passwordConfirmation', password)

  const submitButton = screen.getByTestId('signupButton') as HTMLButtonElement
  fireEvent.submit(submitButton)
}

describe('SignUp', () => {
  it('should start with initial state', async () => {
    makeSut({})

    const loader = screen.queryByTestId('loader')
    expect(loader).not.toBeInTheDocument()

    const errorMessage = screen.queryByTestId('error-message')
    expect(errorMessage).not.toBeInTheDocument()

    getFieldError('name-error')
    getFieldError('email-error')
    getFieldError('password-error')
    getFieldError('passwordConfirmation-error')

    waitFor(() => {
      const button = screen.getByTestId('signupButton') as HTMLButtonElement
      expect(button.disabled).toBe(true)
    })
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

  it('should show valid name state if Validation success', () => {
    makeSut({})
    populateField('name', faker.person.firstName())

    waitFor(() => {
      const errorMessage = screen.queryByTestId('name-error')
      expect(errorMessage).not.toBeInTheDocument()
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

  it('should show valid password state if Validation success', () => {
    makeSut({})
    populateField('password', faker.internet.password())

    waitFor(() => {
      const errorMessage = screen.queryByTestId('password-error')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should show valid passwordConfirmation state if Validation success', () => {
    makeSut({})
    populateField('passwordConfirmation', faker.internet.password())

    waitFor(() => {
      const errorMessage = screen.queryByTestId('passwordConfirmation-error')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should enable submit if form is valid', () => {
    makeSut({})
    const password = faker.internet.password()
    populateField('name', faker.person.firstName())
    populateField('email', faker.internet.email())
    populateField('password', password)
    populateField('passwordConfirmation', password)
    const submitButton = screen.getByTestId('signupButton') as HTMLButtonElement

    waitFor(() => {
      expect(submitButton.disabled).toBe(false)
    })
  })

  it('should show loader on submit', async () => {
    makeSut({})

    populateField('name', faker.person.firstName())
    populateField('email', faker.internet.email())
    populateField('name', faker.internet.password())
    populateField('name', faker.internet.password())

    const submitButton = screen.getByTestId('signupButton') as HTMLButtonElement

    fireEvent.submit(submitButton)

    const loader = screen.queryByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should call AddAccount with correct values', () => {
    const { addAccountSpy } = makeSut({})
    const name = faker.person.firstName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    populateField('name', name)
    populateField('email', email)
    populateField('password', password)
    populateField('passwordConfirmation', password)

    const submitButton = screen.getByTestId('signupButton') as HTMLButtonElement
    fireEvent.submit(submitButton)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    })
  })

  it('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut({})

    simulateSubmitForm()
    simulateSubmitForm()
    simulateSubmitForm()

    waitFor(() => {
      expect(addAccountSpy.callsCount).toHaveBeenCalledTimes(1)
    })
  })

  it('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut({})
    const error = new EmailInUseError()

    simulateSubmitForm()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    waitFor(() => {
      const requestError = screen.queryByTestId('error-message')
      expect(requestError).toBeInTheDocument()
    })
  })

  it('should call SaveAccessToken on success', async () => {
    const { addAccountSpy, saveAccessTokenMock } = makeSut({})

    simulateSubmitForm()

    waitFor(() => {
      expect(saveAccessTokenMock.accessToken).toBe(
        addAccountSpy.account.accessToken,
      )
    })
  })
})
