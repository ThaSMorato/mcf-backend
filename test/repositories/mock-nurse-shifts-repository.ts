import { Mock, vi } from 'vitest'

import { NurseShiftsRepository } from '@/mfc/application/repositories/nurse-shifts-repository'

const create: Mock = vi.fn()

export const nurseShiftsMockFunctions = {
  create,
}

export const mockNurseShiftsRepository: NurseShiftsRepository =
  nurseShiftsMockFunctions
