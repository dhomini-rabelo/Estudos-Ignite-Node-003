import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'

interface InstitutionProps {
  name: string
}

export class Institution extends IEntity<InstitutionProps> {
  static create(props: InstitutionProps) {
    return new Institution(props)
  }

  static reference(id: ID, props: InstitutionProps) {
    return new Institution(props, id)
  }
}
