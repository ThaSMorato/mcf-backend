import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { HealthUnitFactory } from '$/factories/health-unit.factory'
import { NurseFactory } from '$/factories/nurse.factory'
import { ShiftFactory } from '$/factories/shift.factory'

describe('Fetch all health units (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let prisma: PrismaService
  let nurseFactory: NurseFactory
  let healthUnitFactory: HealthUnitFactory
  let shiftFactory: ShiftFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [NurseFactory, HealthUnitFactory, ShiftFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = app.get(JwtService)
    prisma = app.get(PrismaService)
    nurseFactory = app.get(NurseFactory)
    healthUnitFactory = app.get(HealthUnitFactory)
    shiftFactory = app.get(ShiftFactory)

    await app.init()
  })

  test('[POST] /shifts/:shiftId/nurse-shifts', async () => {
    const [nurse, healthUnit] = await Promise.all([
      nurseFactory.makePrismaNurse(),
      healthUnitFactory.makePrismaHealthUnit(),
    ])

    const shift = await shiftFactory.makePrismaShift({
      healthUnitId: healthUnit.id,
    })

    const accessToken = jwt.sign({ sub: String(nurse.id) })

    const response = await request(app.getHttpServer())
      .post(`/shifts/${shift.id}/nurse-shifts`)
      .set('Authorization', `Bearer ${accessToken}`)

    const nurseShiftOnDatabase = await prisma.nurseShift.findFirst()

    expect(response.statusCode).toBe(201)
    expect(nurseShiftOnDatabase).toBeTruthy()
    expect(nurseShiftOnDatabase).toEqual(
      expect.objectContaining({
        shiftId: String(shift.id),
        nurseId: String(nurse.id),
      }),
    )
  })
})
