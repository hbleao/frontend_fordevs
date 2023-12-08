import React from 'react'

import S from './styles.scss'
import {
  Button,
  Footer,
  FormStatus,
  Header,
  Input,
} from '@/presentation/components'

export const Login = () => {
  return (
    <div className={S.login}>
      <Header title="4Dev - Enquentes para para programadores" />
      <form className={S.form}>
        <h2>Ajude a comunidade com seu conhecimento</h2>
        <Input type="email" placeholder="digite seu email" />
        <Input type="password" placeholder="digite sua senha" />
        <Button>Logar</Button>
        <span className={S.createAccount}>Criar conta</span>
        <FormStatus errorMessage="" isLoading={false} />
      </form>
      <Footer />
    </div>
  )
}
