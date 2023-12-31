import React from 'react'
import { createRoot } from 'react-dom/client'

import { Routes } from '@/presentation/router'
import { MakeLogin, MakeSignUp } from './factories'

const root = createRoot(document.getElementById('__main'))

root.render(<Routes MakeLogin={MakeLogin} MakeSignUp={MakeSignUp} />)
