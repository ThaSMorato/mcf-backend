import { Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'

import { HashComparer } from '@/mfc/application/cryptography/hash-comparer'

@Injectable()
export class BcryptHasher implements HashComparer {
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
