import { IRepository } from '@/domain/core/adapters/repository'

import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export type InstitutionRepository = IRepository<Institution, IInstitutionProps>
