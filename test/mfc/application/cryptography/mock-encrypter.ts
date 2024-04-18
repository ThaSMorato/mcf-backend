import { Mock, vi } from 'vitest'

import { Encrypter } from '@/mfc/application/cryptography/encrypter'

const encrypt: Mock = vi.fn()

export const encrypterMockFunctions = {
  encrypt,
}

export const mockEncrypter: Encrypter = encrypterMockFunctions
