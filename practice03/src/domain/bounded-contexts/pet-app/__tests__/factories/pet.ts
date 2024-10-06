import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { ID } from '../../../../core/entities/id'
import { IPetRepository } from '../../application/repositories/pet'
import { IPetProps, Pet } from '../../enterprise/entities/pet'

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
}: Partial<IPetProps> = {}): IPetProps {
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

export class PetFactory implements Factory<IPetProps, Pet> {
  constructor(private PetRepository: IPetRepository) {}

  async create(data: Partial<IPetProps> = {}) {
    return this.PetRepository.create(createPetData(data))
  }
}
