import { IRepository } from '@/domain/core/adapters/repository'
import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'

export type IInstitutionRepository = IRepository<Institution, IInstitutionProps>
