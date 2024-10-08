import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { ID } from '../../../../core/entities/id'
import { PetRepository } from '../../application/repositories/pet'
import { PetProps, Pet } from '../../enterprise/entities/pet'

export function createPetData({
  name = some.text(),
  institutionId = new ID(),
  IBGECode = some.text(),
  description = some.text(),
  animalType = some.valueBetween('cat', 'dog'),
  lifeStage = some.valueBetween('junior', 'adult', 'senior'),
  size = some.valueBetween('small', 'medium', 'large'),
  energyLevel = some.valueBetween('small', 'medium', 'large'),
  independenceLevel = some.valueBetween('small', 'medium', 'large'),
  environmentSize = some.valueBetween('small', 'medium', 'large'),
}: Partial<PetProps> = {}): PetProps {
  return {
    name,
    institutionId,
    IBGECode,
    description,
    animalType,
    lifeStage,
    size,
    energyLevel,
    independenceLevel,
    environmentSize,
  }
}

export class PetFactory implements Factory<PetProps, Pet> {
  constructor(private PetRepository: PetRepository) {}

  async create(data: Partial<PetProps> = {}) {
    return this.PetRepository.create(createPetData(data))
  }
}
