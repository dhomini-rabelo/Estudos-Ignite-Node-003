import { IRepository } from '@/domain/core/adapters/repository'

import {
  InstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export type InstitutionRepository = IRepository<Institution, InstitutionProps>
