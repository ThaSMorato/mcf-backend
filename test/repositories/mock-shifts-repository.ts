import { Mock, vi } from 'vitest'

import { ShiftsRepository } from '@/mfc/application/repositories/Shifts-repository'

const findById: Mock = vi.fn()

export const shiftsMockFunctions = {
  findById,
}

export const mockShiftsRepository: ShiftsRepository = shiftsMockFunctions
