import { InputHTMLAttributes } from 'react'

export type InputProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  errorMessage?: string
}
