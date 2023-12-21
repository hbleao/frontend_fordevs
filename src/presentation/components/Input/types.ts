import { InputHTMLAttributes } from 'react'

type InputTextProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type InputProps = Omit<InputTextProps, 'placeholder'> & {
  errorMessage?: string
  label?: string
}
