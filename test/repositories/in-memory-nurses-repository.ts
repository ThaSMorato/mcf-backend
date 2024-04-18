import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'
import { Nurse } from '@/mfc/domain/entities/nurse'

export class InMemoryNursesRepository implements NursesRepository {
  public items: Nurse[]

  constructor() {
    this.items = []
  }

  async findByEmail(email: string): Promise<Nurse | null> {
    const nurse = this.items.find((item) => item.email === email)

    if (!nurse) {
      return null
    }

    return nurse
  }

  async findById(id: string): Promise<Nurse | null> {
    const nurse = this.items.find((item) => String(item.id) === id)

    if (!nurse) {
      return null
    }

    return nurse
  }
}
