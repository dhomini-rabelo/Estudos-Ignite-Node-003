import { ID } from '../../enterprise/core/entities/id'
import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { ResourceNotFoundError } from '../../ports/database/errors/resource-not-found'
import { ResourceRepeated } from '../../ports/database/errors/resource-repeated'
import { IInstitutionRepository } from '../../ports/database/repositories/institution'

export class InMemoryInstitutionRepository implements IInstitutionRepository {
  private items: Institution[] = []

  async create(props: IInstitutionProps) {
    const newInstitution = Institution.create(props)
    this.items.push(newInstitution)
    return newInstitution
  }

  async findUniqueById(id: string) {
    const itemsFound = this.items.filter((item) => item.id.isEqual(new ID(id)))
    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    } else if (itemsFound.length === 0) {
      throw new ResourceNotFoundError()
    }
    return itemsFound[0]
  }

  async reset() {
    this.items = []
  }
}
