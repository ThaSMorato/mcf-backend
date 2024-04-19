import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { HealthUnit, HealthUnitProps } from '@/mfc/domain/entities/health-unit'
import { makeHealthUnit } from '$/repositories/factories/make-health-unit'

@Injectable()
export class HealthUnitFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaHealthUnit(
    override: Partial<HealthUnitProps> = {},
    id?: UniqueEntityID,
  ): Promise<HealthUnit> {
    const healthUnit = makeHealthUnit(override, id)
    const { address, id: instanceId, latitude, longitude, name } = healthUnit
    await this.prisma.healthUnit.create({
      data: {
        address,
        id: String(instanceId),
        latitude,
        longitude,
        name,
      },
    })

    return healthUnit
  }
}
