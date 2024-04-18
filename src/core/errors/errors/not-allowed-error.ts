import { UseCaseError } from '@/core/errors/use-case-error'

export class NotAllowedError extends Error implements UseCaseError {
  public code: number
  constructor() {
    super('Not allowed')
    this.code = 401
  }
}
