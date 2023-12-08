import React from 'react'

import S from './styles.scss'

import { ButtonProps } from './types'

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={S.button} {...props}>
      {children}
    </button>
  )
}
