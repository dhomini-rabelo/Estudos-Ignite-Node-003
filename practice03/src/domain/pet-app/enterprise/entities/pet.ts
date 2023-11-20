import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'

export interface IPetProps {
  name: string
  IBGECode: string
  institutionId: ID
}

export class Pet extends IEntity<IPetProps> {
  get institutionId() {
    return this.props.institutionId
  }

  get IBGECode() {
    return this.props.IBGECode
  }

  get name() {
    return this.props.name
  }

  static create(props: IPetProps) {
    return new Pet(props)
  }

  static reference(id: ID, props: IPetProps) {
    return new Pet(props, id)
  }
}
