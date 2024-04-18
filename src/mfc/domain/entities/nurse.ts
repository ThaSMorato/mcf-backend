import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface NurseProps {
  email: string
  password: string
  name: string
}

export class Nurse extends Entity<NurseProps> {
  static create(props: NurseProps, id?: UniqueEntityID) {
    const nurse = new Nurse(props, id)

    return nurse
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get name() {
    return this.props.name
  }
}
