import { ID } from '../../enterprise/core/entities/id'
import { WithID } from '../../enterprise/core/entities/types'
import { IPetProps, Pet } from '../../enterprise/entities/pet'
import { IPetRepository } from '../../ports/repositories/pet'

export class InMemoryPetRepository implements IPetRepository {
  private items: Pet[] = []

  async create(props: IPetProps) {
    const newPet = Pet.create(props)
    this.items.push(newPet)
    return newPet
  }

  async findUniqueById(id: string) {
    const itemsFound = this.items.filter(item => item.id.isEqual(new ID(id)))
    if (itemsFound.length > 1) {

    } else if (itemsFound.length === 0) {

    }

    return itemsFound[0]
  }
}
