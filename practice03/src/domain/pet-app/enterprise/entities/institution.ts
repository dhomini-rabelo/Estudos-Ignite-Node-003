import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'
import { Address } from '../value-objects/address'

export interface IInstitutionProps {
  name: string
  address: Address
}

export class Institution extends IEntity<IInstitutionProps> {
  get address() {
    return this.props.address
  }

  get name() {
    return this.props.name
  }

  static create(props: IInstitutionProps) {
    return new Institution(props)
  }

  static reference(id: ID, props: IInstitutionProps) {
    return new Institution(props, id)
  }
}
