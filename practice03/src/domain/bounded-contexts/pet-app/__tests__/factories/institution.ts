import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { IInstitutionRepository } from '../../application/repositories/institution'
import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { createAddress } from './address'

export function createInstitutionData({
  name = some.text(),
  cellNumber = some.text(),
  email = some.text(),
  password = some.text(),
  address = createAddress(),
}: Partial<IInstitutionProps> = {}): IInstitutionProps {
  return {
    name,
    cellNumber,
    email,
    password,
    address,
  }
}

export class InstitutionFactory
  implements Factory<IInstitutionProps, Institution>
{
  constructor(private institutionRepository: IInstitutionRepository) {}

  async create(data: Partial<IInstitutionProps> = {}) {
    return this.institutionRepository.create(createInstitutionData(data))
  }
}
