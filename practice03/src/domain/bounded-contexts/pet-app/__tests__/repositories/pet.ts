import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { PetRepository } from '../../application/repositories/pet'
import { PetProps, Pet } from '../../enterprise/entities/pet'

export class InMemoryPetRepository
  extends InMemoryRepository<typeof Pet, PetProps>
  implements PetRepository
{
  protected entity = Pet as EntityWithStatic<typeof Pet, PetProps>
}
