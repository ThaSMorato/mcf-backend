import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Shift } from './shift'

export interface HealthUnitProps {
  name: string
  latitude: number
  longitude: number
  address: string
  shifts: Shift[]
}

export class HealthUnit extends Entity<HealthUnitProps> {
  static create(
    props: Optional<HealthUnitProps, 'shifts'>,
    id?: UniqueEntityID,
  ) {
    const healthUnit = new HealthUnit(
      {
        ...props,
        shifts: props.shifts ?? [],
      },
      id,
    )

    return healthUnit
  }

  get name() {
    return this.props.name
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get address() {
    return this.props.address
  }

  get shifts() {
    return this.props.shifts
  }
}
