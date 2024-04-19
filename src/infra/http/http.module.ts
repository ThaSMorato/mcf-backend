import { Module } from '@nestjs/common'

import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'
import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateNurseController } from './controllers/authenticate-nurse.controller'
import { FetchAllHealthUnitsController } from './controllers/fetch-all-health-units.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [FetchAllHealthUnitsController, AuthenticateNurseController],
  providers: [FetchAllHealthUnitsUseCase, AuthenticateNurseUseCase],
})
export class HttpModule {}
