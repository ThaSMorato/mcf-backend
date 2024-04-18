import { ShiftsRepository } from '@/mfc/application/repositories/shifts-repository'
import { Shift } from '@/mfc/domain/entities/shift'

import { ShiftMapper } from '../mappers/shitf.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaShiftsRepository implements ShiftsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Shift | null> {
    const prismaShift = await this.prisma.shift.findUnique({
      where: { id },
    })

    if (!prismaShift) {
      return null
    }

    return ShiftMapper.toDomain(prismaShift)
  }
}
