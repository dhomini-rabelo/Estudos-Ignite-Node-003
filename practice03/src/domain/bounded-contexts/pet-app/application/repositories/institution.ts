import { Repository } from '@/domain/core/adapters/repository'

import {
  InstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export type InstitutionRepository = Repository<Institution, InstitutionProps>
