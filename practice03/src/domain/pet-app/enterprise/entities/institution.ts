import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'
import { Address } from '../value-objects/address'

export interface IInstitutionProps {
  name: string
  email: string
  cellNumber: string
  password: string
  address: Address
}

export class Institution extends IEntity<IInstitutionProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get cellNumber() {
    return this.props.cellNumber
  }

  get password() {
    return this.props.password
  }

  get address() {
    return this.props.address
  }

  static create(props: IInstitutionProps) {
    return new Institution(props)
  }

  static reference(id: ID, props: IInstitutionProps) {
    return new Institution(props, id)
  }
}
