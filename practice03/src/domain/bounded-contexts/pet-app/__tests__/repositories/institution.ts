import { IInMemoryRepository } from '../../../../core/adapters/repository'
import { InstitutionRepository } from '../../application/repositories/institution'
import {
  InstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export class InMemoryInstitutionRepository
  extends IInMemoryRepository<Institution, InstitutionProps>
  implements InstitutionRepository
{
  protected entity = Institution
}
