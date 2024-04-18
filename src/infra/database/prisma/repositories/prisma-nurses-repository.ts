import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { Nurse } from '@/mfc/domain/entities/nurse'

import { NurseMapper } from '../mappers/nurse.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaNursesRepository implements NursesRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Nurse | null> {
    const prismaNurse = await this.prisma.nurse.findUnique({
      where: { email },
    })

    if (!prismaNurse) {
      return null
    }

    return NurseMapper.toDomain(prismaNurse)
  }

  async findById(id: string): Promise<Nurse | null> {
    const prismaNurse = await this.prisma.nurse.findUnique({
      where: { id },
    })

    if (!prismaNurse) {
      return null
    }

    return NurseMapper.toDomain(prismaNurse)
  }
}
