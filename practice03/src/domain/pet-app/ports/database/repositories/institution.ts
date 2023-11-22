import {
  IInstitutionProps,
  Institution,
} from '../../../enterprise/entities/institution'

export interface IInstitutionRepository {
  create(props: IInstitutionProps): Promise<Institution>
  findUniqueByEmail(id: string): Promise<Institution | null>
  findUniqueById(id: string): Promise<Institution>
  reset(): Promise<void>
}
