import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Nurse } from '@/mfc/domain/entities/nurse'

import { NursesRepository } from '../repositories/nurses-repository'

interface GetNurseByIdUseCaseRequest {
  nurseId: string
}

type GetNurseByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { nurse: Nurse }
>

@Injectable()
export class GetNurseByIdUseCase {
  constructor(private nursesRepository: NursesRepository) {}

  async execute({
    nurseId,
  }: GetNurseByIdUseCaseRequest): Promise<GetNurseByIdUseCaseResponse> {
    const nurse = await this.nursesRepository.findById(nurseId)

    if (!nurse) {
      return left(new ResourceNotFoundError())
    }

    return right({ nurse })
  }
}
