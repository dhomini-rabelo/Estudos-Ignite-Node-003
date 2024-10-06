import { PetRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/pet'
import {
  PetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'

import { UseCase } from '../../../../../core/use-cases/base'

interface Payload
  extends Partial<
    Pick<
      PetProps,
      | 'lifeStage'
      | 'energyLevel'
      | 'size'
      | 'independenceLevel'
      | 'animalType'
      | 'institutionId'
    >
  > {
  IBGECode: PetProps['IBGECode']
}

export class ListPetsUseCase implements UseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(payload: Payload): Promise<Pet[]> {
    return this.petRepository.findMany(payload)
  }
}
