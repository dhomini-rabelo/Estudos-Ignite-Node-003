import { WithID } from '@/domain/core/entities/types'
import { ID } from '../../../../core/entities/id'
import { ResourceNotFoundError } from '../../ports/database/errors/resource-not-found'
import { ResourceRepeated } from '../../ports/database/errors/resource-repeated'
import { IEntity } from '@/domain/core/entities/base'
import { IRepository } from '../../ports/database/repositories/base'
import { EmptyRecord } from 'types/simple'

export abstract class IInMemoryRepository<
  Entity extends IEntity<any>,
  Props extends EmptyRecord,
> implements IRepository<Entity, Props>
{
  protected items: Entity[] = []
  protected entity: {
    create(props: Props): Entity
  }

  async create(props: Props) {
    const newPet = this.entity.create(props)
    this.items.push(newPet)
    return newPet
  }

  async get(props: Partial<WithID<Props>>): Promise<Entity> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    } else if (itemsFound.length === 0) {
      throw new ResourceNotFoundError()
    }
    return itemsFound[0]
  }

  async findUnique(props: Partial<WithID<Props>>): Promise<Entity | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    }
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findFirst(props: Partial<WithID<Props>>): Promise<Entity | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findMany(props: Partial<WithID<Props>>) {
    return this.items.filter((item) => this.compare(item, props))
  }

  async reset() {
    this.items = []
  }

  private compare(item: Entity, props: Partial<WithID<Props>>): boolean {
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
