import React from 'react'
import { createRoot } from 'react-dom/client'

import { Login } from '@/presentation/pages'

const root = createRoot(document.getElementById('__main'))

root.render(<Login />)
