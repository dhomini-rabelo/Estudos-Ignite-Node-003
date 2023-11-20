import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'

export interface IInstitutionProps {
  name: string
}

export class Institution extends IEntity<IInstitutionProps> {
  static create(props: IInstitutionProps) {
    return new Institution(props)
  }

  static reference(id: ID, props: IInstitutionProps) {
    return new Institution(props, id)
  }
}
