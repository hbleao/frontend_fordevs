import React from 'react'

import S from './styles.scss'

import { InputProps } from './types'

export const Input = ({ errorMessage, ...props }: InputProps) => {
  return (
    <>
      <div className={S.inputWrapper}>
        <input {...props} />
      </div>
      {!!errorMessage && (
        <span className={S.errorMessage} data-testid={`${props.name}-error`}>
          {errorMessage}
        </span>
      )}
    </>
  )
}
