import { IInMemoryRepository } from '../../../../core/adapters/repository'
import { PetRepository } from '../../application/repositories/pet'
import { PetProps, Pet } from '../../enterprise/entities/pet'

export class InMemoryPetRepository
  extends IInMemoryRepository<Pet, PetProps>
  implements PetRepository
{
  protected entity = Pet
}
