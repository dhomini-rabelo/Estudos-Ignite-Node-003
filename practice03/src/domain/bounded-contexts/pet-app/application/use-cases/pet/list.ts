import { PetRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/pet'
import {
  IPetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'

import { IBaseUseCase } from '../../../../../core/use-cases/base'

interface Payload
  extends Partial<
    Pick<
      IPetProps,
      | 'lifeStage'
      | 'energyLevel'
      | 'size'
      | 'independenceLevel'
      | 'animalType'
      | 'institutionId'
    >
  > {
  IBGECode: IPetProps['IBGECode']
}

export class ListPetsUseCase implements IBaseUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(payload: Payload): Promise<Pet[]> {
    return this.petRepository.findMany(payload)
  }
}
