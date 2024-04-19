import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'

import { Public } from '@/infra/auth/public'
import { AuthenticateNurseUseCase } from '@/mfc/application/use-cases/authenticate-nurse'

import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const authenticateNurseBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const authenticateNursePipe = new ZodValidationPipe(authenticateNurseBodySchema)

type AuthenticateNurseBodySchema = z.infer<typeof authenticateNurseBodySchema>

@Controller('/sessions')
export class AuthenticateNurseController {
  constructor(private authenticateNurseUseCase: AuthenticateNurseUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Public()
  async handle(@Body(authenticateNursePipe) body: AuthenticateNurseBodySchema) {
    const { email, password } = body
    const response = await this.authenticateNurseUseCase.execute({
      email,
      password,
    })

    if (response.isLeft()) {
      const error = response.value

      throw new UnauthorizedException(error.message)
    }

    const { accessToken } = response.value

    return { access_token: accessToken }
  }
}
