import { HashComparer } from '@/mfc/application/cryptography/hash-comparer'

export class FakeHasher implements HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
