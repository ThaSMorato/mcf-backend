import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Shift, ShiftProps } from '@/mfc/domain/entities/shift'

export function makeShift(
  override: Partial<ShiftProps> = {},
  id?: UniqueEntityID,
) {
  const shift = Shift.create(
    {
      description: faker.lorem.sentence(),
      endTime: '18:00',
      startTime: '13:00',
      healthUnitId: new UniqueEntityID(),
      name: faker.word.words(),
      ...override,
    },
    id,
  )

  return shift
}
