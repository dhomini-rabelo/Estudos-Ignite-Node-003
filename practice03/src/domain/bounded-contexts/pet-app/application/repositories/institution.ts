import {
  IInstitutionProps,
  Institution,
} from '../../enterprise/entities/institution'
import { IRepository } from './base'

export type IInstitutionRepository = IRepository<Institution, IInstitutionProps>
