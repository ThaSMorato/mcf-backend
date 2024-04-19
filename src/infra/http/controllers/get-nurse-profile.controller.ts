import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { GetNurseByIdUseCase } from '@/mfc/application/use-cases/get-nurse-by-id'

import { NursePresenter } from '../presenters/nurse.presenter'

@Controller('/profile')
export class GetNurseProfileController {
  constructor(private getNurseByIdUseCase: GetNurseByIdUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload) {
    const { sub: nurseId } = user
    console.log(nurseId)
    const response = await this.getNurseByIdUseCase.execute({
      nurseId,
    })

    if (response.isLeft()) {
      const error = response.value

      throw new UnauthorizedException(error.message)
    }

    const { nurse } = response.value

    const { email, name } = NursePresenter.toHttp(nurse)

    return {
      profile: {
        email,
        name,
      },
    }
  }
}
