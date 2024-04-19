import { HealthUnit as PrismaHealthUnit, Shift } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { ShiftMapper } from './shitf.mapper'

interface PrismaHealthUnitsWithShifts extends PrismaHealthUnit {
  shifts: Shift[]
}

export class HealthUnitMapper {
  static toDomain({
    address,
    id,
    latitude,
    longitude,
    name,
    shifts,
  }: PrismaHealthUnitsWithShifts): HealthUnit {
    const healthUnit = HealthUnit.create(
      {
        address,
        latitude,
        longitude,
        name,
        shifts: shifts.map(ShiftMapper.toDomain),
      },
      new UniqueEntityID(id),
    )

    return healthUnit
  }
}
