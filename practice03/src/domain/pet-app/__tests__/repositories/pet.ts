import { IPetProps, Pet } from '../../enterprise/entities/pet'
import { IPetRepository } from '../../ports/repositories/pet'

export class InMemoryPetRepository implements IPetRepository {
  private items: Pet[] = []

  async create(props: IPetProps) {
    const newPet = Pet.create(props)
    this.items.push(newPet)
    return newPet
  }
}
