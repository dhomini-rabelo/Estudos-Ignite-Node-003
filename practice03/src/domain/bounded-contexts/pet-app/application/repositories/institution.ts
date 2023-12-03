import { IRepository } from '@/domain/core/adapters/database/repository/base'
import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export type IInstitutionRepository = IRepository<Institution, IInstitutionProps>
