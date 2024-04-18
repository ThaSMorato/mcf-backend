import { NurseShiftsRepository } from '@/mfc/application/repositories/nurse-shifts-repository'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

import { NurseShiftMapper } from '../mappers/nurse-shift.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaNurseShiftsRepository implements NurseShiftsRepository {
  constructor(private prisma: PrismaService) {}

  async create(nurseShift: NurseShift): Promise<void> {
    const data = NurseShiftMapper.toPrisma(nurseShift)

    await this.prisma.nurseShift.create({
      data,
    })
  }
}
