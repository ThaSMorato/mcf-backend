import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HealthUnit, HealthUnitProps } from '@/mfc/domain/entities/health-unit'

export function makeHealthUnit(
  override: Partial<HealthUnitProps> = {},
  id?: UniqueEntityID,
) {
  const healthUnit = HealthUnit.create(
    {
      address: faker.location.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      name: faker.company.name(),
      ...override,
    },
    id,
  )

  return healthUnit
}
