import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'
import { makeHealthUnit } from '$/repositories/factories/make-health-unit'
import { InMemoryHealthUnitsRepository } from '$/repositories/in-memory-health-units-repository'
import {
  healthUnitsMockFunctions,
  mockHealthUnitsRepository,
} from '$/repositories/mock-health-units-repository'

let sut: FetchAllHealthUnitsUseCase
let healthUnitsInMemoryRepository: InMemoryHealthUnitsRepository

describe('Fetch all health units use case', () => {
  describe('Unit tests', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      sut = new FetchAllHealthUnitsUseCase(mockHealthUnitsRepository)
    })

    it('Should fetch the first page if none is passed', async () => {
      healthUnitsMockFunctions.findMany.mockResolvedValue([
        makeHealthUnit({
          name: 'Health Unit 1',
        }),
      ])

      const response = await sut.execute({})

      expect(response.isRight()).toBeTruthy()
      expect(response.value.healthUnits).toHaveLength(1)
      expect(response.value.healthUnits).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Health Unit 1',
          }),
        ]),
      )
      expect(healthUnitsMockFunctions.findMany).toBeCalledWith({ page: 1 })
    })

    it('Should fetch the a page if page is passed', async () => {
      healthUnitsMockFunctions.findMany.mockResolvedValue([
        makeHealthUnit({
          name: 'Health Unit 1',
        }),
      ])

      const response = await sut.execute({
        page: 10,
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value.healthUnits).toHaveLength(1)
      expect(response.value.healthUnits).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Health Unit 1',
          }),
        ]),
      )
      expect(healthUnitsMockFunctions.findMany).toBeCalledWith({ page: 10 })
    })
  })
  describe('Integration tests', () => {
    beforeEach(() => {
      healthUnitsInMemoryRepository = new InMemoryHealthUnitsRepository()
      sut = new FetchAllHealthUnitsUseCase(healthUnitsInMemoryRepository)
      Array.from({ length: 15 }).forEach((_, index) => {
        const unit = makeHealthUnit({
          name: `Health Unit ${index + 1}`,
        })

        healthUnitsInMemoryRepository.items.push(unit)
      })
    })

    it('Should fetch the first page with 10 elements', async () => {
      const response = await sut.execute({})

      expect(response.isRight()).toBeTruthy()
      expect(response.value.healthUnits).toHaveLength(10)
      expect(response.value.healthUnits).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Health Unit 1',
          }),
          expect.objectContaining({
            name: 'Health Unit 2',
          }),
          expect.objectContaining({
            name: 'Health Unit 3',
          }),
          expect.objectContaining({
            name: 'Health Unit 4',
          }),
          expect.objectContaining({
            name: 'Health Unit 5',
          }),
          expect.objectContaining({
            name: 'Health Unit 6',
          }),
          expect.objectContaining({
            name: 'Health Unit 7',
          }),
          expect.objectContaining({
            name: 'Health Unit 8',
          }),
          expect.objectContaining({
            name: 'Health Unit 9',
          }),
          expect.objectContaining({
            name: 'Health Unit 10',
          }),
        ]),
      )
    })

    it('Should fetch the second page with 5 elements', async () => {
      const response = await sut.execute({
        page: 2,
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value.healthUnits).toHaveLength(5)
      expect(response.value.healthUnits).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Health Unit 11',
          }),
          expect.objectContaining({
            name: 'Health Unit 12',
          }),
          expect.objectContaining({
            name: 'Health Unit 13',
          }),
          expect.objectContaining({
            name: 'Health Unit 14',
          }),
          expect.objectContaining({
            name: 'Health Unit 15',
          }),
        ]),
      )
    })

    it('Should fetch the third page with 0 elements', async () => {
      const response = await sut.execute({
        page: 3,
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value.healthUnits).toHaveLength(0)
    })
  })
})
