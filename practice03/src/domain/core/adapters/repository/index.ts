import { EmptyRecord } from 'types/simple'

import { WithID } from '@/domain/core/entities/types'

export interface Repository<Entity, Props extends EmptyRecord> {
  create(props: Props): Promise<Entity>
  get(props: Partial<WithID<Props>>): Promise<Entity>
  findUnique(props: Partial<WithID<Props>>): Promise<Entity | null>
  findFirst(props: Partial<WithID<Props>>): Promise<Entity | null>
  findMany(params: Partial<WithID<Props>>): Promise<Entity[]>
  reset(): Promise<void>
}
