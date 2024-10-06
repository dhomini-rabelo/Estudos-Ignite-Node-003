import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { PetRepository } from '../../application/repositories/pet'
import { Pet } from '../../enterprise/entities/pet'

export class InMemoryPetRepository
  extends InMemoryRepository<Pet>
  implements PetRepository
{
  protected entity = Pet as unknown as EntityWithStatic<Pet>
}
