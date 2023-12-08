import React from 'react'

import S from './styles.scss'

import { Loader } from '../Loader'

import { FormStatusProps } from './types'

export const FormStatus = ({ isLoading, errorMessage }: FormStatusProps) => {
  return (
    <>
      {isLoading && (
        <div className={S.loaderWrapper} data-testid="spinner">
          <Loader />
        </div>
      )}
      {!!errorMessage && (
        <div className={S.errorWrapper} data-testid="error-message">
          <span className={S.error}>{errorMessage}</span>
        </div>
      )}
    </>
  )
}
