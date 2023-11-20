import { some } from '@tests/utils/some'
import { IPetProps } from '../../enterprise/entities/pet'
import { ID } from '../../enterprise/core/entities/id'

export function makePetData({
  name = some.text(),
  institutionId = new ID(),
  IBGECode = some.text(),
}: Partial<IPetProps> = {}) {
  return {
    name,
    institutionId,
    IBGECode,
  }
}
