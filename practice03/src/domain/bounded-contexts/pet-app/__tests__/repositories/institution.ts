import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { IInstitutionRepository } from '../../application/repositories/institution'
import { IInMemoryRepository } from '../../../../core/adapters/repository'

export class InMemoryInstitutionRepository
  extends IInMemoryRepository<Institution, IInstitutionProps>
  implements IInstitutionRepository
{
  protected entity = Institution
}
