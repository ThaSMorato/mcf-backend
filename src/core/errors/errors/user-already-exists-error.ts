import { UseCaseError } from '@/core/errors/use-case-error'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  public code: number

  constructor() {
    super('User already exists')
    this.code = 409
  }
}
