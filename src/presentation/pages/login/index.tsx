import React from 'react'

import S from './styles.scss'
import {
  Footer,
  FormStatus,
  Header,
  Input,
  Loader,
} from '@/presentation/components'

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
        <FormStatus errorMessage="error" isLoading={false} />
      </form>
      <Footer />
    </div>
  )
}
