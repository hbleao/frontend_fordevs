import React, { useRef } from 'react'

import S from './styles.scss'

import { InputProps } from './types'

export const Input = ({ label, name, errorMessage, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const status = errorMessage ? 'invalid' : 'valid'

  return (
    <>
      <div className={S.inputWrapper}>
        <input
          ref={inputRef}
          data-testid={name}
          data-status={status}
          {...props}
        />
        <label onClick={() => inputRef.current.focus()}>{label}</label>
      </div>
      {!!errorMessage && (
        <span className={S.errorMessage} data-testid={`${name}-error`}>
          {errorMessage}
        </span>
      )}
    </>
  )
}
