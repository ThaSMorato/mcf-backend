import { Nurse } from '@/mfc/domain/entities/nurse'

export abstract class NursesRepository {
  abstract findByEmail(email: string): Promise<Nurse | null>
}
