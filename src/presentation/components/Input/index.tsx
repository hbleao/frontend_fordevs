import React, { useRef } from 'react'

import S from './styles.scss'

import { InputProps } from './types'

export const Input = ({ errorMessage, ...props }: InputProps) => {
  const inputRef = useRef(null)
  return (
    <>
      <div className={S.inputWrapper}>
        <input
          ref={inputRef}
          data-testid={props.name}
          {...props}
          placeholder=" "
        />
        <label onClick={() => inputRef.current.focus()}>
          {props.placeholder}
        </label>
      </div>
      {!!errorMessage && (
        <span className={S.errorMessage} data-testid={`${props.name}-error`}>
          {errorMessage}
        </span>
      )}
    </>
  )
}
