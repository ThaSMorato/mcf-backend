import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { NursesRepository } from '../repositories/nurses-repository'

interface AuthenticateNurseUseCaseRequest {
  email: string
  password: string
}

type AuthenticateNurseUseCaseResponse = Either<
  NotAllowedError,
  {
    accessToken: string
  }
>

export class AuthenticateNurseUseCase {
  constructor(
    private nursesRepository: NursesRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateNurseUseCaseRequest): Promise<AuthenticateNurseUseCaseResponse> {
    const student = await this.nursesRepository.findByEmail(email)

    if (!student) {
      return left(new NotAllowedError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new NotAllowedError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: String(student.id),
    })

    return right({
      accessToken,
    })
  }
}
