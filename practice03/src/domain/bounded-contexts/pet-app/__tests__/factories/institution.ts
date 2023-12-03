import { some } from '@tests/utils/some'
import { Address } from '../../enterprise/value-objects/address'
import { IInstitutionProps } from '../../enterprise/entities/institution'
import { IInstitutionRepository } from '../../application/repositories/institution'

export function makeInstitutionData({
  name = some.text(),
  cellNumber = some.text(),
  email = some.text(),
  password = some.text(),
  address,
}: Partial<IInstitutionProps> = {}): IInstitutionProps {
  return {
    name,
    cellNumber,
    email,
    password,
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

export class InstitutionFactory {
  constructor(private institutionRepository: IInstitutionRepository) {}

  async make(data: Partial<IInstitutionProps> = {}) {
    return this.institutionRepository.create(makeInstitutionData(data))
  }
}
