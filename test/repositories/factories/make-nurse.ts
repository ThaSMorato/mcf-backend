import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Nurse, NurseProps } from '@/mfc/domain/entities/nurse'

export function makeNurse(
  override: Partial<NurseProps> = {},
  id?: UniqueEntityID,
) {
  const nurse = Nurse.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return nurse
}
