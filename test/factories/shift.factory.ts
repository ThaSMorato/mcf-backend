import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Shift, ShiftProps } from '@/mfc/domain/entities/shift'
import { makeShift } from '$/repositories/factories/make-shift'

@Injectable()
export class ShiftFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaShift(
    override: Partial<ShiftProps> = {},
    id?: UniqueEntityID,
  ): Promise<Shift> {
    const shift = makeShift(override, id)
    const {
      id: instanceId,
      name,
      description,
      endTime,
      healthUnitId,
      startTime,
    } = shift
    await this.prisma.shift.create({
      data: {
        id: String(instanceId),
        name,
        description,
        endTime,
        healthUnitId: String(healthUnitId),
        startTime,
      },
    })

    return shift
  }
}
