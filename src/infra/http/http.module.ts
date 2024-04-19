import { Module } from '@nestjs/common'

import { ApplyToShiftUseCase } from '@/mfc/application/use-cases/apply-to-shift'
import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'
import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'
import { GetNurseByIdUseCase } from '@/mfc/application/use-cases/get-nurse-by-id'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { ApplyToShiftController } from './controllers/apply-to-shift.controller'
import { AuthenticateNurseController } from './controllers/authenticate-nurse.controller'
import { FetchAllHealthUnitsController } from './controllers/fetch-all-health-units.controller'
import { GetNurseProfileController } from './controllers/get-nurse-profile.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    FetchAllHealthUnitsController,
    AuthenticateNurseController,
    ApplyToShiftController,
    GetNurseProfileController,
  ],
  providers: [
    FetchAllHealthUnitsUseCase,
    AuthenticateNurseUseCase,
    ApplyToShiftUseCase,
    GetNurseByIdUseCase,
  ],
})
export class HttpModule {}
