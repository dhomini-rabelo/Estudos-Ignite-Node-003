import { IEntity } from '@/domain/core/entities/base'
import { EmptyRecord } from '@typing/simple'

import { DatabaseError } from './_base'

export class ResourceNotFoundError extends DatabaseError {
  public type = 'resource-not-found'

  constructor(public readonly entity: IEntity<EmptyRecord>) {
    super()
  }
}
