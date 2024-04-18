import { NurseShiftsRepository } from '@/mfc/application/repositories/nurse-shifts-repository'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

export class InMemoryNurseShiftsRepository implements NurseShiftsRepository {
  public items: NurseShift[]

  constructor() {
    this.items = []
  }

  async create(nurseShift: NurseShift): Promise<void> {
    this.items.push(nurseShift)
  }
}
