import { IInMemoryRepository } from '../../../../core/adapters/repository'
import { PetRepository } from '../../application/repositories/pet'
import { IPetProps, Pet } from '../../enterprise/entities/pet'

export class InMemoryPetRepository
  extends IInMemoryRepository<Pet, IPetProps>
  implements PetRepository
{
  protected entity = Pet
}
