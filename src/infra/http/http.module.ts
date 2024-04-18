import { Module } from '@nestjs/common'

import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { FetchAllHealthUnitsController } from './controllers/fetch-all-health-units.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [FetchAllHealthUnitsController],
  providers: [FetchAllHealthUnitsUseCase],
})
export class HttpModule {}
