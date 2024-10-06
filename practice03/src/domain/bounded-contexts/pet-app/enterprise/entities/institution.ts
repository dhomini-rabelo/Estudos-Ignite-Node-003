import { Entity } from '../../../../core/entities/base'
import { ID } from '../../../../core/entities/id'
import { Address } from '../value-objects/address'

export interface InstitutionProps {
  name: string
  email: string
  cellNumber: string
  password: string
  address: Address
}

export class Institution extends Entity<InstitutionProps> {
  static create(props: InstitutionProps) {
    return new Institution(props)
  }

  static reference(id: ID, props: InstitutionProps) {
    return new Institution(props, id)
  }
}
