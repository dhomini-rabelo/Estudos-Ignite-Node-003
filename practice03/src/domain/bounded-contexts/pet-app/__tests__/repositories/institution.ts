import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { ResourceRepeated } from '../../ports/database/errors/resource-repeated'
import { IInstitutionRepository } from '../../ports/database/repositories/institution'
import { IInMemoryRepository } from './base'

export class InMemoryInstitutionRepository
  extends IInMemoryRepository<Institution, IInstitutionProps>
  implements IInstitutionRepository
{
  protected entity = Institution

  async findUniqueByEmail(email: string) {
    const itemsFound = this.items.filter((item) => item.email === email)
    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    }
    return itemsFound.length === 1 ? itemsFound[0] : null
  }
}
