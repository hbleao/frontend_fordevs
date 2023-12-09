import { Validation } from '../protocols'

export class ValidationSpy implements Validation {
  private errorMessage: string
  public fieldName: string
  public fieldValue: string

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}
