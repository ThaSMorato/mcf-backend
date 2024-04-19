import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { NurseFactory } from '$/factories/nurse.factory'

describe('Get Nurse Profile (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let nurseFactory: NurseFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [NurseFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = app.get(JwtService)
    nurseFactory = app.get(NurseFactory)

    await app.init()
  })

  test('[Get] /profile', async () => {
    const nurse = await nurseFactory.makePrismaNurse()

    const accessToken = jwt.sign({ sub: String(nurse.id) })

    const response = await request(app.getHttpServer())
      .get(`/profile`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      profile: {
        name: nurse.name,
        email: nurse.email,
      },
    })
  })
})
