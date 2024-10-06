import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { InstitutionRepository } from '../../application/repositories/institution'
import {
  InstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export class InMemoryInstitutionRepository
  extends InMemoryRepository<typeof Institution, InstitutionProps>
  implements InstitutionRepository
{
  protected entity = Institution as EntityWithStatic<
    typeof Institution,
    InstitutionProps
  >
}
