import React from 'react'

import S from './styles.scss'

import { Loader } from '../Loader'

type FormStatusProps = {
  errorMessage: string
  isLoading: boolean
}

export const FormStatus = ({ isLoading, errorMessage }: FormStatusProps) => {
  return (
    <>
      {isLoading && (
        <div className={S.loaderWrapper}>
          <Loader />
        </div>
      )}
      {!!errorMessage && (
        <div className={S.errorWrapper}>
          <span className={S.error}>{errorMessage}</span>
        </div>
      )}
    </>
  )
}
