import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import '../styles/reset.scss'

export type RoutesProps = {
  MakeLogin: React.FunctionComponent
}

export const Routes = ({ MakeLogin }: RoutesProps) => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <MakeLogin />,
    },
  ])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
