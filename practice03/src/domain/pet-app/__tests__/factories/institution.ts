import { some } from '@tests/utils/some'
import { Address } from '../../enterprise/value-objects/address'
import { IInstitutionProps } from '../../enterprise/entities/institution'

export function makeInstitutionData({
  name = some.text(),
  address,
}: Partial<IInstitutionProps> = {}) {
  return {
    name,
    address:
      address ||
      new Address({
        city: some.text(),
        IBGECode: some.text(),
        number: some.text(),
        state: some.text(),
        zipCode: some.text(),
      }),
  }
}
