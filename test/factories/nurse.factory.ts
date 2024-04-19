import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Nurse, NurseProps } from '@/mfc/domain/entities/nurse'
import { makeNurse } from '$/repositories/factories/make-nurse'

@Injectable()
export class NurseFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNurse(
    override: Partial<NurseProps> = {},
    id?: UniqueEntityID,
  ): Promise<Nurse> {
    const nurse = makeNurse(override, id)
    const { email, id: instanceId, name, password } = nurse
    await this.prisma.nurse.create({
      data: {
        id: String(instanceId),
        email,
        name,
        password,
      },
    })

    return nurse
  }
}
