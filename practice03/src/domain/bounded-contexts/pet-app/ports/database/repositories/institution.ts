import {
  IInstitutionProps,
  Institution,
} from '../../../enterprise/entities/institution'
import { IRepository } from './base'

export interface IInstitutionRepository
  extends IRepository<Institution, IInstitutionProps> {
  findUniqueByEmail(id: string): Promise<Institution | null>
  findUniqueById(id: string): Promise<Institution>
}
