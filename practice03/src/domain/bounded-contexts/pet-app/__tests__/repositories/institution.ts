import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { IInstitutionRepository } from '../../ports/database/repositories/institution'
import { IInMemoryRepository } from '../../../../core/adapters/database/repository/base'

export class InMemoryInstitutionRepository
  extends IInMemoryRepository<Institution, IInstitutionProps>
  implements IInstitutionRepository
{
  protected entity = Institution
}
