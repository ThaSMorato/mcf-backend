import { Shift as PrismaShift } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Shift } from '@/mfc/domain/entities/shift'

export class ShiftMapper {
  static toDomain({
    description,
    endTime,
    healthUnitId,
    id,
    name,
    startTime,
  }: PrismaShift): Shift {
    const shift = Shift.create(
      {
        description,
        endTime,
        healthUnitId: new UniqueEntityID(healthUnitId),
        name,
        startTime,
      },
      new UniqueEntityID(id),
    )

    return shift
  }
}
