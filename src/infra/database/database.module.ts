import { Module } from '@nestjs/common'

import { ShiftsRepository } from '@/mfc/application/repositories/shifts-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaShiftsRepository } from './prisma/repositories/prisma-shifts-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: ShiftsRepository,
      useClass: PrismaShiftsRepository,
    },
  ],
  exports: [PrismaShiftsRepository],
})
export class DatabaseModule {}
