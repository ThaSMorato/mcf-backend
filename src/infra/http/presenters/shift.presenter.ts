import { Shift } from '@/mfc/domain/entities/shift'

export class ShiftPresenter {
  static toHttp({
    description,
    endTime,
    healthUnitId,
    id,
    name,
    startTime,
  }: Shift) {
    return {
      description,
      endTime,
      healthUnitId: String(healthUnitId),
      id: String(id),
      name,
      startTime,
    }
  }
}
