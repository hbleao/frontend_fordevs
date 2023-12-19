import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import '../styles/reset.scss'

export type RoutesProps = {
  MakeLogin: React.FunctionComponent
  MakeSignUp: React.FunctionComponent
}

export const Routes = ({ MakeLogin, MakeSignUp }: RoutesProps) => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <MakeLogin />,
    },
    {
      path: '/signup',
      element: <MakeSignUp />,
    },
  ])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
