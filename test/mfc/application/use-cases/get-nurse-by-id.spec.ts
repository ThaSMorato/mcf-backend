import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetNurseByIdUseCase } from '@/mfc/application/use-cases/get-nurse-by-id'
import { Nurse } from '@/mfc/domain/entities/nurse'
import { makeNurse } from '$/repositories/factories/make-nurse'
import { InMemoryNursesRepository } from '$/repositories/in-memory-nurses-repository'
import {
  mockNursesRepository,
  nursesMockFunctions,
} from '$/repositories/mock-nurses-repository'

let sut: GetNurseByIdUseCase
let nursesInMemoryRepository: InMemoryNursesRepository
describe('Fetch all health units use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new GetNurseByIdUseCase(mockNursesRepository)
    })

    it('Should call repository and hasher functions and return encrypter response on success', async () => {
      nursesMockFunctions.findById.mockResolvedValue(makeNurse())

      const response = await sut.execute({
        nurseId: 'a_nurse_id',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurse: expect.any(Nurse),
      })
      expect(nursesMockFunctions.findById).toBeCalledWith('a_nurse_id')
    })

    it('Should give an error if nurse is not found', async () => {
      nursesMockFunctions.findById.mockResolvedValue(null)

      const response = await sut.execute({
        nurseId: 'not_a_valid_nurse_id',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
      expect(nursesMockFunctions.findById).toBeCalledWith(
        'not_a_valid_nurse_id',
      )
    })
  })

  describe('Integration tests', () => {
    beforeEach(async () => {
      nursesInMemoryRepository = new InMemoryNursesRepository()

      sut = new GetNurseByIdUseCase(nursesInMemoryRepository)
    })

    it('Should return a token on success', async () => {
      const nurse = makeNurse({
        email: 'a_nurse_email@email.com',
        password: 'passs123',
      })

      nursesInMemoryRepository.items.push(nurse)

      const response = await sut.execute({
        nurseId: String(nurse.id),
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurse,
      })
    })

    it('Should give an error if email is not found', async () => {
      const response = await sut.execute({
        nurseId: 'not_a_nurse_id',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    })
  })
})
