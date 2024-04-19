import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

import { NurseShiftsRepository } from '../repositories/nurse-shifts-repository'
import { NursesRepository } from '../repositories/nurses-repository'
import { ShiftsRepository } from '../repositories/shifts-repository'

interface ApplyToShiftUseCaseRequest {
  nurseId: string
  shiftId: string
}

type ApplyToShiftUseCaseResponse = Either<
  ResourceNotFoundError,
  { nurseShift: NurseShift }
>

@Injectable()
export class ApplyToShiftUseCase {
  constructor(
    private nursesRepository: NursesRepository,
    private shiftsRepository: ShiftsRepository,
    private nurseShiftsRepository: NurseShiftsRepository,
  ) {}

  async execute({
    nurseId,
    shiftId,
  }: ApplyToShiftUseCaseRequest): Promise<ApplyToShiftUseCaseResponse> {
    const nurse = await this.nursesRepository.findById(nurseId)

    if (!nurse) {
      return left(new ResourceNotFoundError())
    }

    const shift = await this.shiftsRepository.findById(shiftId)

    if (!shift) {
      return left(new ResourceNotFoundError())
    }

    const nurseShift = NurseShift.create({
      nurseId: nurse.id,
      shiftId: shift.id,
    })

    await this.nurseShiftsRepository.create(nurseShift)

    return right({
      nurseShift,
    })
  }
}
