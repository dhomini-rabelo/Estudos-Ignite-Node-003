import { ID } from '../../../../core/entities/id'
import { IPetProps, Pet } from '../../enterprise/entities/pet'
import { IPetRepository } from '../../ports/database/repositories/pet'
import { IInMemoryRepository } from './base'

export class InMemoryPetRepository
  extends IInMemoryRepository<Pet, IPetProps>
  implements IPetRepository
{
  protected entity = Pet

  async findUniqueById(id: string) {
    return this.get({ id: new ID(id) })
  }
}
