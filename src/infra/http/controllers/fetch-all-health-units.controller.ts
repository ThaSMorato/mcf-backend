import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { z } from 'zod'

import { Public } from '@/infra/auth/public'
import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'

import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { HealthUnitPresenter } from '../presenters/health-unit.presenter'

const fetchAllHealthUnitsQuerySchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const fetchAllHealthUnitsQueryPipe = new ZodValidationPipe(
  fetchAllHealthUnitsQuerySchema,
)

type FetchAllHealthUnitsQuerySchema = z.infer<
  typeof fetchAllHealthUnitsQuerySchema
>

@Controller('/health-units')
export class FetchAllHealthUnitsController {
  constructor(private fetchAllHealthUnitsUseCase: FetchAllHealthUnitsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  async handle(
    @Query('page', fetchAllHealthUnitsQueryPipe)
    page: FetchAllHealthUnitsQuerySchema,
  ) {
    const response = await this.fetchAllHealthUnitsUseCase.execute({
      page,
    })

    if (response.isLeft()) {
      throw new BadRequestException()
    }

    const { healthUnits } = response.value

    return {
      health_units: healthUnits.map(HealthUnitPresenter.toHttp),
    }
  }
}
