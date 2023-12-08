import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Login } from '../pages'

import '../styles/reset.scss'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
])

export const Routes = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
