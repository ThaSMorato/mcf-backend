import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ApplyToShiftUseCase } from '@/mfc/application/use-cases/apply-to-shift'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'
import { makeNurse } from '$/repositories/factories/make-nurse'
import { makeShift } from '$/repositories/factories/make-shift'
import { InMemoryNurseShiftsRepository } from '$/repositories/in-memory-nurse-shifts-repository'
import { InMemoryNursesRepository } from '$/repositories/in-memory-nurses-repository'
import { InMemoryShiftsRepository } from '$/repositories/in-memory-shifts-repository'
import {
  mockNurseShiftsRepository,
  nurseShiftsMockFunctions,
} from '$/repositories/mock-nurse-shifts-repository'
import {
  mockNursesRepository,
  nursesMockFunctions,
} from '$/repositories/mock-nurses-repository'
import {
  mockShiftsRepository,
  shiftsMockFunctions,
} from '$/repositories/mock-shifts-repository'

let sut: ApplyToShiftUseCase
let nursesInMemoryRepository: InMemoryNursesRepository
let shiftsInMemoryRepository: InMemoryShiftsRepository
let nurseShiftsInMemoryRepository: InMemoryNurseShiftsRepository

describe('Fetch all health units use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new ApplyToShiftUseCase(
        mockNursesRepository,
        mockShiftsRepository,
        mockNurseShiftsRepository,
      )
    })

    it('Should call nurse and shifts find methods and create a nurse shift', async () => {
      nursesMockFunctions.findById.mockResolvedValue(makeNurse())
      shiftsMockFunctions.findById.mockResolvedValue(makeShift())

      const response = await sut.execute({
        nurseId: 'a_nurse_id',
        shiftId: 'a_shift_id',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurseShift: expect.any(NurseShift),
      })
      expect(nursesMockFunctions.findById).toBeCalledWith('a_nurse_id')
      expect(shiftsMockFunctions.findById).toBeCalledWith('a_shift_id')
      expect(nurseShiftsMockFunctions.create).toBeCalledWith(
        expect.any(NurseShift),
      )
    })

    it('Should give an error if none nurse is found', async () => {
      nursesMockFunctions.findById.mockResolvedValue(null)

      const response = await sut.execute({
        nurseId: 'not_a_nurse_id',
        shiftId: 'a_shift_id',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
      expect(nursesMockFunctions.findById).toBeCalledWith('not_a_nurse_id')
      expect(shiftsMockFunctions.findById).not.toBeCalled()
      expect(nurseShiftsMockFunctions.create).not.toBeCalled()
    })

    it('Should give an error if none shift is found', async () => {
      nursesMockFunctions.findById.mockResolvedValue(makeNurse())
      shiftsMockFunctions.findById.mockResolvedValue(null)

      const response = await sut.execute({
        nurseId: 'a_nurse_id',
        shiftId: 'not_a_shift_id',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
      expect(nursesMockFunctions.findById).toBeCalledWith('a_nurse_id')
      expect(shiftsMockFunctions.findById).toBeCalledWith('not_a_shift_id')
      expect(nurseShiftsMockFunctions.create).not.toBeCalled()
    })
  })
  describe('Integration tests', () => {
    beforeEach(() => {
      nursesInMemoryRepository = new InMemoryNursesRepository()
      shiftsInMemoryRepository = new InMemoryShiftsRepository()
      nurseShiftsInMemoryRepository = new InMemoryNurseShiftsRepository()

      sut = new ApplyToShiftUseCase(
        nursesInMemoryRepository,
        shiftsInMemoryRepository,
        nurseShiftsInMemoryRepository,
      )
    })

    it('Should create an nurse shift for the shift that a nurse applyed', async () => {
      const shift = makeShift()
      const nurse = makeNurse()

      nursesInMemoryRepository.items.push(nurse)
      shiftsInMemoryRepository.items.push(shift)

      const response = await sut.execute({
        nurseId: String(nurse.id),
        shiftId: String(shift.id),
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual({
        nurseShift: expect.objectContaining({
          nurseId: nurse.id,
          shiftId: shift.id,
          approved: undefined,
        }),
      })
    })

    it('Should give an error if nurse is not found', async () => {
      const shift = makeShift()
      const nurse = makeNurse()

      nursesInMemoryRepository.items.push(nurse)
      shiftsInMemoryRepository.items.push(shift)

      const response = await sut.execute({
        nurseId: 'not_a_nurse_id',
        shiftId: String(shift.id),
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    })

    it('Should give an error if shift is not found', async () => {
      const shift = makeShift()
      const nurse = makeNurse()

      nursesInMemoryRepository.items.push(nurse)
      shiftsInMemoryRepository.items.push(shift)

      const response = await sut.execute({
        nurseId: String(nurse.id),
        shiftId: 'not_a_shift_id',
      })

      expect(response.isLeft()).toBeTruthy()
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    })
  })
})
