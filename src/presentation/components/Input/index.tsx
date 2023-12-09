import React from 'react'

import S from './styles.scss'

import { InputProps } from './types'

export const Input = ({ errorMessage, ...props }: InputProps) => {
  return (
    <>
      <div className={S.inputWrapper}>
        <input data-testid={props.name} {...props} />
      </div>
      {!!errorMessage && (
        <span className={S.errorMessage} data-testid={`${props.name}-error`}>
          {errorMessage}
        </span>
      )}
    </>
  )
}
