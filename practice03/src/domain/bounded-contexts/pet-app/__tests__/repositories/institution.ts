import { IInMemoryRepository } from '../../../../core/adapters/repository'
import { InstitutionRepository } from '../../application/repositories/institution'
import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export class InMemoryInstitutionRepository
  extends IInMemoryRepository<Institution, IInstitutionProps>
  implements InstitutionRepository
{
  protected entity = Institution
}
