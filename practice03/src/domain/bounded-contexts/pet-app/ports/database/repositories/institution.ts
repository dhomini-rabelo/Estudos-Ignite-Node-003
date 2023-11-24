import { Institution } from '../../../enterprise/entities/institution'
import { IRepository } from './base'

export interface IInstitutionRepository<Entity, Props>
  extends IRepository<Entity, Props> {
  findUniqueByEmail(id: string): Promise<Institution | null>
  findUniqueById(id: string): Promise<Institution>
}
