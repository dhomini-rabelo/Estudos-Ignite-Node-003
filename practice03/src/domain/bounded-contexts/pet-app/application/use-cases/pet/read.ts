import { PetRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/pet'
import { Pet } from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { ID } from '@/domain/core/entities/id'

import { IBaseUseCase } from '../../../../../core/use-cases/base'

export class ReadPetUseCase implements IBaseUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(request: { id: string }): Promise<Pet> {
    return this.petRepository.get({ id: new ID(request.id) })
  }
}
