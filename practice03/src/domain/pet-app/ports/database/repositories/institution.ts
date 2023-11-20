import { IInstitutionProps, Institution } from '../../../enterprise/entities/institution'

export interface IInstitutionRepository {
  create(props: IInstitutionProps): Promise<Institution>
  findUniqueById(id: string): Promise<Institution>
}
