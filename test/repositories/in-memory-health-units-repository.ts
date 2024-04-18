import { PaginationParams } from '@/core/repositories/pagination-params'
import { HealthUnitsRepository } from '@/mfc/application/repositories/health-units-repository'
import { HealthUnit } from '@/mfc/domain/entities/health-unit'

export class InMemoryHealthUnitsRepository implements HealthUnitsRepository {
  public items: HealthUnit[]

  constructor() {
    this.items = []
  }

  async findMany({ page }: PaginationParams): Promise<HealthUnit[]> {
    const ITENS_PER_PAGE = 10

    const healthUnits = this.items.slice(
      (page - 1) * ITENS_PER_PAGE,
      page * ITENS_PER_PAGE,
    )

    return healthUnits
  }
}
