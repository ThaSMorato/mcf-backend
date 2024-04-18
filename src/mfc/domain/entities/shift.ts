import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ShiftProps {
  name: string
  description: string
  startTime: string
  endTime: string
  healthUnitId: UniqueEntityID
}

export class Shift extends Entity<ShiftProps> {
  static create(props: ShiftProps, id?: UniqueEntityID) {
    const shift = new Shift(props, id)

    return shift
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get startTime() {
    return this.props.startTime
  }

  get endTime() {
    return this.props.endTime
  }

  get healthUnitId() {
    return this.props.healthUnitId
  }
}
