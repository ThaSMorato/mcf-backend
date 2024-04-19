import { Module } from '@nestjs/common'

import { HealthUnitsRepository } from '@/mfc/application/repositories/health-units-repository'
import { NurseShiftsRepository } from '@/mfc/application/repositories/nurse-shifts-repository'
import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { ShiftsRepository } from '@/mfc/application/repositories/shifts-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaHealthUnitsRepository } from './prisma/repositories/prisma-health-units-repository'
import { PrismaNurseShiftsRepository } from './prisma/repositories/prisma-nurse-shifts-repository'
import { PrismaNursesRepository } from './prisma/repositories/prisma-nurses-repository'
import { PrismaShiftsRepository } from './prisma/repositories/prisma-shifts-repository'
import { SeederService } from './prisma/seed/seeder.service'

@Module({
  imports: [],
  providers: [
    SeederService,
    PrismaService,
    {
      provide: ShiftsRepository,
      useClass: PrismaShiftsRepository,
    },
    {
      provide: NursesRepository,
      useClass: PrismaNursesRepository,
    },
    {
      provide: NurseShiftsRepository,
      useClass: PrismaNurseShiftsRepository,
    },
    {
      provide: HealthUnitsRepository,
      useClass: PrismaHealthUnitsRepository,
    },
  ],
  exports: [
    SeederService,
    PrismaService,
    ShiftsRepository,
    NursesRepository,
    NurseShiftsRepository,
    HealthUnitsRepository,
  ],
})
export class DatabaseModule {}
