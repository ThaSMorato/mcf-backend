import { Nurse as PrismaNurse } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Nurse } from '@/mfc/domain/entities/nurse'

export class NurseMapper {
  static toDomain({ email, id, name, password }: PrismaNurse): Nurse {
    const nurse = Nurse.create(
      {
        email,
        name,
        password,
      },
      new UniqueEntityID(id),
    )

    return nurse
  }
}
