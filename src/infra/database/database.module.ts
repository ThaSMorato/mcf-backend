import { Module } from '@nestjs/common'

import { NurseShiftsRepository } from '@/mfc/application/repositories/nurse-shifts-repository'
import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { ShiftsRepository } from '@/mfc/application/repositories/shifts-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaNurseShiftsRepository } from './prisma/repositories/prisma-nurse-shifts-repository'
import { PrismaNursesRepository } from './prisma/repositories/prisma-nurses-repository'
import { PrismaShiftsRepository } from './prisma/repositories/prisma-shifts-repository'

@Module({
  providers: [
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
  ],
  exports: [
    PrismaShiftsRepository,
    PrismaNursesRepository,
    PrismaNurseShiftsRepository,
  ],
})
export class DatabaseModule {}
