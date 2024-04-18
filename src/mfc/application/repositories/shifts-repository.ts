import { Shift } from '@/mfc/domain/entities/shift'

export abstract class ShiftsRepository {
  abstract findById(id: string): Promise<Shift | null>
}
