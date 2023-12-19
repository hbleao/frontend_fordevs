import { Validation } from '../protocols'

export class ValidationSpy implements Validation {
  public errorMessage: string
  public fieldName: string
  public input: object

  validate(fieldName: string, input: object): string {
    this.fieldName = fieldName
    this.input = input
    return this.errorMessage
  }
}
