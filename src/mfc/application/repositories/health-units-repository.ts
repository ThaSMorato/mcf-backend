import { PaginationParams } from '@/core/repositories/pagination-params'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

export abstract class HealthUnitsRepository {
  abstract findMany(params: PaginationParams): Promise<HealthUnit[]>
}
