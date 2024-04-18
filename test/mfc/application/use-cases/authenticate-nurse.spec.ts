import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Encrypter } from '@/mfc/application/cryptography/encrypter'
import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'
import { makeNurse } from '$/repositories/factories/make-nurse'
import { InMemoryNursesRepository } from '$/repositories/in-memory-nurses-repository'
import {
  mockNursesRepository,
  nursesMockFunctions,
} from '$/repositories/mock-nurses-repository'

import { FakeEncrypter } from '../cryptography/fake-encrypter'
import { FakeHasher } from '../cryptography/fake-hasher'
import {
  encrypterMockFunctions,
  mockEncrypter,
} from '../cryptography/mock-encrypter'
import { hasherMockFunctions, mockHasher } from '../cryptography/mock-hasher'

let sut: AuthenticateNurseUseCase
let nursesInMemoryRepository: InMemoryNursesRepository
let hasher: FakeHasher
let encrypter: Encrypter
describe('Fetch all health units use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new AuthenticateNurseUseCase(
        mockNursesRepository,
        mockHasher,
        mockEncrypter,
      )
    })

    it('Should call repository and hasher functions and return encrypter response on success', async () => {
      nursesMockFunctions.findByEmail.mockResolvedValue(makeNurse())
      hasherMockFunctions.compare.mockResolvedValue(true)
      encrypterMockFunctions.encrypt.mockResolvedValue('a-token')

      const response = await sut.execute({
        email: 'a_email',
        password: 'pass',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        accessToken: 'a-token',
      })
      expect(nursesMockFunctions.findByEmail).toBeCalledWith('a_email')
      expect(hasherMockFunctions.compare).toBeCalledTimes(1)
      expect(encrypterMockFunctions.encrypt).toBeCalledTimes(1)
    })

    it('Should give an error if nurse is not found', async () => {
      nursesMockFunctions.findByEmail.mockResolvedValue(null)

      const response = await sut.execute({
        email: 'a_email',
        password: 'pass',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
      expect(nursesMockFunctions.findByEmail).toBeCalledWith('a_email')
      expect(hasherMockFunctions.compare).not.toBeCalled()
      expect(encrypterMockFunctions.encrypt).not.toBeCalled()
    })

    it('Should give an error if hasher returns false', async () => {
      nursesMockFunctions.findByEmail.mockResolvedValue(makeNurse())
      hasherMockFunctions.compare.mockResolvedValue(false)

      const response = await sut.execute({
        email: 'a_email',
        password: 'pass',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
      expect(nursesMockFunctions.findByEmail).toBeCalledWith('a_email')
      expect(hasherMockFunctions.compare).toBeCalledTimes(1)
      expect(encrypterMockFunctions.encrypt).not.toBeCalled()
    })
  })

  describe('Integration tests', () => {
    beforeEach(async () => {
      nursesInMemoryRepository = new InMemoryNursesRepository()
      hasher = new FakeHasher()
      encrypter = new FakeEncrypter()

      sut = new AuthenticateNurseUseCase(
        nursesInMemoryRepository,
        hasher,
        encrypter,
      )

      const nurse = makeNurse({
        email: 'a_nurse_email@email.com',
        password: await hasher.hash('pass-123'),
      })

      nursesInMemoryRepository.items.push(nurse)
    })

    it('Should return a token on success', async () => {
      const response = await sut.execute({
        email: 'a_nurse_email@email.com',
        password: 'pass-123',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        accessToken: expect.any(String),
      })
    })

    it('Should give an error if email is not found', async () => {
      const response = await sut.execute({
        email: 'not_a_recorded_email@email.com',
        password: 'pass-123',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
    })

    it('Should give an error if password is not correct', async () => {
      const response = await sut.execute({
        email: 'a_nurse_email@email.com',
        password: 'not_correct_password',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(NotAllowedError)
    })
  })
})
