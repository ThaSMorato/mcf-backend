import { HealthUnit as PrismaHealthUnit } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

export class HealthUnitMapper {
  static toDomain({
    address,
    id,
    latitude,
    longitude,
    name,
  }: PrismaHealthUnit): HealthUnit {
    const healthUnit = HealthUnit.create(
      {
        address,
        latitude,
        longitude,
        name,
      },
      new UniqueEntityID(id),
    )

    return healthUnit
  }
}
