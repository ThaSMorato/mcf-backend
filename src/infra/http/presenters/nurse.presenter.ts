import { Nurse } from '@/mfc/domain/entities/nurse'

export class NursePresenter {
  static toHttp({ email, name, id }: Nurse) {
    return { email, name, id: String(id) }
  }
}
