import React from 'react'

import S from './styles.scss'
import { Footer, Header, Input, Loader } from '@/presentation/components'

export const Login = () => {
  return (
    <div className={S.login}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form}>
        <h2>Ajude a comunidade com seu conhecimento</h2>
        <Input type="email" placeholder="digite seu email" />
        <Input type="password" placeholder="digite sua senha" />
        <button className={S.button} type="submit">
          Logar
        </button>
        <span className={S.createAccount}>Criar conta</span>
        {true && (
          <div className={S.loaderWrapper}>
            <Loader />
          </div>
        )}
        {true && (
          <div className={S.errorWrapper}>
            <span className={S.error}>Error</span>
          </div>
        )}
      </form>
      <Footer />
    </div>
  )
}
