import { ShiftsRepository } from '@/mfc/application/repositories/shifts-repository'
import { Shift } from '@/mfc/domain/entities/shift'

export class InMemoryShiftsRepository implements ShiftsRepository {
  public items: Shift[]

  constructor() {
    this.items = []
  }

  async findById(id: string): Promise<Shift | null> {
    const shift = this.items.find((item) => String(item.id) === id)

    if (!shift) {
      return null
    }

    return shift
  }
}
