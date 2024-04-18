import { NurseShift as PrismaNurseShift } from '@prisma/client'

import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

export class NurseShiftMapper {
  static toPrisma({
    approved,
    id,
    nurseId,
    shiftId,
    updatedAt,
    createdAt,
  }: NurseShift): PrismaNurseShift {
    return {
      approved,
      id: String(id),
      nurseId: String(nurseId),
      shiftId: String(shiftId),
      updatedAt,
      createdAt,
    }
  }
}
