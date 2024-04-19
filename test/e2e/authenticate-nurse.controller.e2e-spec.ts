import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { NurseFactory } from '$/factories/nurse.factory'

describe('Fetch all health units (E2E)', () => {
  let app: INestApplication
  let nurseFactory: NurseFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [NurseFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    nurseFactory = app.get(NurseFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await nurseFactory.makePrismaNurse({
      email: 'jhon_doe@mail.com',
      password: await hash('pass123', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'jhon_doe@mail.com',
      password: 'pass123',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
      }),
    )
  })
})
