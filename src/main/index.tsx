import React from 'react'
import { createRoot } from 'react-dom/client'

import { Routes } from '@/presentation/router'

const root = createRoot(document.getElementById('__main'))

root.render(<Routes />)
