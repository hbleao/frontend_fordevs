import React from 'react'

import S from './styles.scss'

import { InputProps } from './types'

export const Input = ({ children, ...props }: InputProps) => {
  return (
    <div className={S.inputWrapper}>
      <input {...props} />
      <span className={S.status}>🔴</span>
    </div>
  )
}
