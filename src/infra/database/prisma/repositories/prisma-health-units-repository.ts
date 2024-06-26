import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { HealthUnitsRepository } from '@/mfc/application/repositories/health-units-repository'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { HealthUnitMapper } from '../mappers/health-unit.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaHealthUnitsRepository implements HealthUnitsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<HealthUnit[]> {
    const ITENS_PER_PAGE = 10

    const prismaHealthUnits = await this.prisma.healthUnit.findMany({
      skip: (page - 1) * ITENS_PER_PAGE,
      take: ITENS_PER_PAGE,
      include: {
        shifts: true,
      },
    })

    return prismaHealthUnits.map(HealthUnitMapper.toDomain)
  }
}
