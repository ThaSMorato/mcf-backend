import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  public code: number

  constructor() {
    super('Resource not found')
    this.code = 404
  }
}
