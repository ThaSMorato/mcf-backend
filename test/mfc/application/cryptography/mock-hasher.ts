import { Mock, vi } from 'vitest'

import { HashComparer } from '@/mfc/application/cryptography/hash-comparer'

const compare: Mock = vi.fn()

export const hasherMockFunctions = {
  compare,
}

export const mockHasher: HashComparer = hasherMockFunctions
