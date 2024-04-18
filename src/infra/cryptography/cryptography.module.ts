import { Module } from '@nestjs/common'

import { Encrypter } from '@/mfc/application/cryptography/encrypter'
import { HashComparer } from '@/mfc/application/cryptography/hash-comparer'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer],
})
export class CryptographyModule {}
