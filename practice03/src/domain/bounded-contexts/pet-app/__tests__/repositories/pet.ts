import { WithID } from '@/domain/core/entities/types'
import { ID } from '../../../../core/entities/id'
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

  async get(props: Partial<WithID<IPetProps>>): Promise<Pet> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))

    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    } else if (itemsFound.length === 0) {
      throw new ResourceNotFoundError()
    }

    return itemsFound[0]
  }

  async findUnique(props: Partial<WithID<IPetProps>>): Promise<Pet | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))

    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    }

    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findFirst(props: Partial<WithID<IPetProps>>): Promise<Pet | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    return itemsFound.length === 1 ? itemsFound[0] : null
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

  async findMany(props: Partial<WithID<IPetProps>>) {
    return this.items.filter((item) => this.compare(item, props))
  }

  async reset() {
    this.items = []
  }

  private compare(item: Pet, props: Partial<WithID<IPetProps>>): boolean {
    return Object.entries(props).every(
      ([fieldName, fieldValue]: [string, any]) => {
        const prop = item.getProp(fieldName)
        return prop instanceof ID && fieldValue instanceof ID
          ? prop.isEqual(fieldValue)
          : prop === fieldValue
      },
    )
  }
}
