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
  it('should not render spinner and error message on start', () => {
    makeSut()
    const spinner = screen.queryByTestId('spinner')
    expect(spinner).not.toBeInTheDocument()
  })
})
