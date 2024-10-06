import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { InstitutionRepository } from '../../application/repositories/institution'
import {
  InstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { createAddress } from './address'

export function createInstitutionData({
  name = some.text(),
  cellNumber = some.text(),
  email = some.text(),
  password = some.text(),
  address = createAddress(),
}: Partial<InstitutionProps> = {}): InstitutionProps {
  return {
    name,
    cellNumber,
    email,
    password,
    address,
  }
}

export class InstitutionFactory
  implements Factory<InstitutionProps, Institution>
{
  constructor(private institutionRepository: InstitutionRepository) {}

  async create(data: Partial<InstitutionProps> = {}) {
    return this.institutionRepository.create(createInstitutionData(data))
  }
}
