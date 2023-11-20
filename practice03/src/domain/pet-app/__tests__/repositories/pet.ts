import { ID } from '../../enterprise/core/entities/id'
import { IPetProps, Pet } from '../../enterprise/entities/pet'
import { ResourceNotFoundError } from '../../ports/database/errors/resource-not-found'
import { ResourceRepeated } from '../../ports/database/errors/resource-repeated'
import { IPetRepository } from '../../ports/database/repositories/pet'

export class InMemoryPetRepository implements IPetRepository {
  private items: Pet[] = []

  async create(props: IPetProps) {
    const newPet = Pet.create(props)
    this.items.push(newPet)
    return newPet
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

  async findMany(params: Partial<IPetProps>) {
    return this.items.filter((item) => item.IBGECode === params.IBGECode)
  }

  async reset() {
    this.items = []
  }
}
