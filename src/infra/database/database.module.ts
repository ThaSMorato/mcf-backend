import { Module } from '@nestjs/common'

import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { ShiftsRepository } from '@/mfc/application/repositories/shifts-repository'

import { PrismaService } from './prisma/prisma.service'
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
  ],
  exports: [PrismaShiftsRepository, PrismaNursesRepository],
})
export class DatabaseModule {}
