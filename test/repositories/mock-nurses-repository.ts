import { Mock, vi } from 'vitest'

import { NursesRepository } from '@/mfc/application/repositories/nurses-repository'

const findByEmail: Mock = vi.fn()
const findById: Mock = vi.fn()

export const nursesMockFunctions = {
  findById,
  findByEmail,
}

export const mockNursesRepository: NursesRepository = nursesMockFunctions
