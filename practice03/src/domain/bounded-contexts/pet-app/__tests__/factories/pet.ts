import { some } from '@tests/utils/some'
import { IPetProps } from '../../enterprise/entities/pet'
import { ID } from '../../enterprise/core/entities/id'

export function makePetData({
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
