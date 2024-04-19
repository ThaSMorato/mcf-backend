import {
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ApplyToShiftUseCase } from '@/mfc/application/use-cases/apply-to-shift'

@Controller('/shifts/:shiftId/nurse-shift')
export class ApplyToShiftController {
  constructor(private applyToShiftUseCase: ApplyToShiftUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('shiftId') shiftId: string,
  ) {
    const { sub: nurseId } = user
    const response = await this.applyToShiftUseCase.execute({
      nurseId,
      shiftId,
    })

    if (response.isLeft()) {
      const error = response.value

      throw new NotFoundException(error.message)
    }
  }
}
