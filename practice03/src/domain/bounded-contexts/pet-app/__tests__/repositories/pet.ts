import { IPetProps, Pet } from '../../enterprise/entities/pet'
import { IPetRepository } from '../../application/repositories/pet'
import { IInMemoryRepository } from '../../../../core/adapters/database/repository/base'

export class InMemoryPetRepository
  extends IInMemoryRepository<Pet, IPetProps>
  implements IPetRepository
{
  protected entity = Pet
}
