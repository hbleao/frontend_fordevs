import React from 'react'

import S from './style.scss'

export const Loader = () => {
  return (
    <div className={S.spinner}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
