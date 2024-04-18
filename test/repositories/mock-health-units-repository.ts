import { Mock, vi } from 'vitest'

import { HealthUnitsRepository } from '@/mfc/application/repositories/health-units-repository'

const findMany: Mock = vi.fn()

export const healthUnitsMockFunctions = {
  findMany,
}

export const mockHealthUnitsRepository: HealthUnitsRepository =
  healthUnitsMockFunctions
