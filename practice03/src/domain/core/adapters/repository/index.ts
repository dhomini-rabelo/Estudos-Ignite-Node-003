import { WithID } from '@/domain/core/entities/types'

import { IEntity } from '../../entities/base'

export interface Repository<Entity extends IEntity> {
  create(props: Entity['props']): Promise<Entity>
  get(props: Partial<WithID<Entity['props']>>): Promise<Entity>
  findUnique(props: Partial<WithID<Entity['props']>>): Promise<Entity | null>
  findFirst(props: Partial<WithID<Entity['props']>>): Promise<Entity | null>
  findMany(params: Partial<WithID<Entity['props']>>): Promise<Entity[]>
  reset(): Promise<void>
}
