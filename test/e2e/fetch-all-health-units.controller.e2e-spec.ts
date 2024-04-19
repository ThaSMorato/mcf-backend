import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { HealthUnitFactory } from '$/factories/health-unit.factory'

describe('Fetch all health units (E2E)', () => {
  let app: INestApplication
  let healthUnitFactory: HealthUnitFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [HealthUnitFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    healthUnitFactory = app.get(HealthUnitFactory)

    await Promise.all(
      Array.from({ length: 15 }).map((_, index) =>
        healthUnitFactory.makePrismaHealthUnit({
          name: `Health Unit ${index + 1}`,
        }),
      ),
    )

    await app.init()
  })

  test('[GET] /health-units?page=1', async () => {
    const response = await request(app.getHttpServer()).get(
      '/health-units?page=1',
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      health_units: [
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
      ],
    })
  })

  test('[GET] /health-units?page=2', async () => {
    const response = await request(app.getHttpServer()).get(
      '/health-units?page=2',
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      health_units: [
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
        expect.objectContaining({
          name: expect.stringContaining('Health Unit'),
        }),
      ],
    })
  })
})
