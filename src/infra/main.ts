import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { SeederService } from './database/prisma/seed/seeder.service'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  const nodeEnv = envService.get('NODE_ENV')

  if (nodeEnv === 'DEV') {
    const seederService = app.get(SeederService)
    await seederService.checkAndSeed()
  }

  app.enableCors({
    origin: true, // This can be a specific URL or true to allow all origins
    credentials: true, // This allows cookies to be sent
  })

  await app.listen(port)
}
bootstrap()
