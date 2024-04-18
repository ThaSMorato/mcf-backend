import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

export abstract class NurseShiftsRepository {
  abstract create(nurseShift: NurseShift): Promise<void>
}
