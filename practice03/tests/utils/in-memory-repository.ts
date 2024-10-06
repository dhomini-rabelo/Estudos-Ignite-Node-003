import { EmptyRecord } from 'types/simple'

import { Repository } from '@/domain/core/adapters/repository'
import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'
import { ResourceRepeated } from '@/domain/core/adapters/repository/errors/resource-repeated'
import { EntityWithStatic, IEntity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'
import { WithID } from '@/domain/core/entities/types'

export abstract class InMemoryRepository<
  Entity extends typeof IEntity<any>,
  Props extends EmptyRecord,
> implements Repository<IEntity, Props>
{
  protected items: IEntity[] = []
  protected entity: EntityWithStatic<Entity, Props>

  async create(props: Props) {
    const newPet = await this.entity.create(props)
    this.items.push(newPet)
    return newPet
  }

  async get(props: Partial<WithID<Props>>): Promise<IEntity> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    } else if (itemsFound.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }
    return itemsFound[0]
  }

  async findUnique(props: Partial<WithID<Props>>): Promise<IEntity | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    if (itemsFound.length > 1) {
      throw new ResourceRepeated()
    }
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findFirst(props: Partial<WithID<Props>>): Promise<IEntity | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, props))
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findMany(props: Partial<WithID<Props>>) {
    return this.items.filter((item) => this.compare(item, props))
  }

  async reset() {
    this.items = []
  }

  private compare(item: IEntity, props: Partial<WithID<Props>>): boolean {
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
