import { PetRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/pet'
import { Pet } from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { ID } from '@/domain/core/entities/id'

import { UseCase } from '../../../../../core/use-cases/base'

interface Payload {
  id: string
}

export class ReadPetUseCase implements UseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(payload: Payload): Promise<Pet> {
    return this.petRepository.get({ id: new ID(payload.id) })
  }
}
