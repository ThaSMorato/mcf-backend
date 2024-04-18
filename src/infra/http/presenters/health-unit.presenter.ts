import { HealthUnit } from '@/mfc/domain/entities/health-unit'

import { ShiftPresenter } from './shift.presenter'

export class HealthUnitPresenter {
  static toHttp({
    address,
    id,
    latitude,
    longitude,
    name,
    shifts,
  }: HealthUnit) {
    return {
      address,
      id,
      latitude,
      longitude,
      name,
      shifts: shifts.map(ShiftPresenter.toHttp),
    }
  }
}
