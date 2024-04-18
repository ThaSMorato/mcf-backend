import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Env } from './env'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<Key extends keyof Env>(key: Key) {
    return this.configService.get(key, { infer: true })
  }
}
