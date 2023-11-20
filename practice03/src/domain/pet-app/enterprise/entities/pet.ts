import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'

export interface IPetProps {
  name: string
}

export class Pet extends IEntity<IPetProps> {
  static create(props: IPetProps) {
    return new Pet(props)
  }

  static reference(id: ID, props: IPetProps) {
    return new Pet(props, id)
  }
}
