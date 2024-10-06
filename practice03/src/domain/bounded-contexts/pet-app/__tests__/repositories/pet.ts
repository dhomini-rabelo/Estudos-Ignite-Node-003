import { IInMemoryRepository } from '../../../../core/adapters/repository'
import { IPetRepository } from '../../application/repositories/pet'
import { IPetProps, Pet } from '../../enterprise/entities/pet'

export class InMemoryPetRepository
  extends IInMemoryRepository<Pet, IPetProps>
  implements IPetRepository
{
  protected entity = Pet
}
