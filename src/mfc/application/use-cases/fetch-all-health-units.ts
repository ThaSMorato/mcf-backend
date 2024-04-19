import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { HealthUnitsRepository } from '../repositories/health-units-repository'

interface FetchAllHealthUnitsUseCaseRequest {
  page?: number
}

type FetchAllHealthUnitsUseCaseResponse = Either<
  null,
  { healthUnits: HealthUnit[] }
>

@Injectable()
export class FetchAllHealthUnitsUseCase {
  constructor(private healthUnitsRepository: HealthUnitsRepository) {}

  async execute({
    page = 1,
  }: FetchAllHealthUnitsUseCaseRequest): Promise<FetchAllHealthUnitsUseCaseResponse> {
    const response = await this.healthUnitsRepository.findMany({ page })

    return right({
      healthUnits: response,
    })
  }
}
