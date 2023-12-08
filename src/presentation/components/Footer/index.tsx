import React, { memo } from 'react'

import S from './styles.scss'

export const Component = () => {
  return <footer className={S.footer}>footer</footer>
}

export const Footer = memo(Component)
