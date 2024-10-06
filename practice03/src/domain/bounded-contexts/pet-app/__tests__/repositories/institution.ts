import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { InstitutionRepository } from '../../application/repositories/institution'
import { Institution } from '../../enterprise/entities/institution'

export class InMemoryInstitutionRepository
  extends InMemoryRepository<Institution>
  implements InstitutionRepository
{
  protected entity = Institution as unknown as EntityWithStatic<Institution>
}
