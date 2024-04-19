import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '../prisma.service'

@Injectable()
export class SeederService {
  constructor(private prisma: PrismaService) {}

  async checkAndSeed() {
    const haveData = await this.prisma.nurse.findFirst()

    if (!haveData) {
      console.log('#### SEEDING ####')
      await this.seed()
      console.log('#### FINISHED SEEDING ####')
    }
  }

  private async seed() {
    const healthUnits = await Promise.all(
      Array.from({ length: 15 }).map(async (_) => {
        return await this.prisma.healthUnit.create({
          data: {
            address: faker.location.streetAddress(),
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
            name: faker.company.name(),
            id: String(new UniqueEntityID()),
          },
        })
      }),
    )

    await Promise.all([
      ...healthUnits.map(async (healthUnit) => {
        return await this.prisma.shift.createMany({
          data: [
            {
              endTime: '12:00',
              startTime: '04:00',
              name: 'Morning Shift',
              healthUnitId: healthUnit.id,
              description: faker.lorem.sentence(),
              id: String(new UniqueEntityID()),
            },
            {
              description: faker.lorem.sentence(),
              endTime: '20:00',
              startTime: '12:00',
              name: 'Afternon Shift',
              healthUnitId: healthUnit.id,
              id: String(new UniqueEntityID()),
            },
            {
              description: faker.lorem.sentence(),
              endTime: '04:00',
              startTime: '20:00',
              name: 'Night Shift',
              healthUnitId: healthUnit.id,
              id: String(new UniqueEntityID()),
            },
          ],
        })
      }),
      this.prisma.nurse.create({
        data: {
          email: 'jhon_doe@mail.com',
          password: await hash('pass123', 8),
          name: 'Jhon Doe',
          id: String(new UniqueEntityID()),
        },
      }),
    ])
  }
}
