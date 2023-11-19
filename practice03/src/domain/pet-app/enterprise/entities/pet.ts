import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'

interface PetProps {
  name: string
}

export class Pet extends IEntity<PetProps> {
  static create(props: PetProps) {
    return new Pet(props)
  }

  static reference(id: ID, props: PetProps) {
    return new Pet(props, id)
  }
}
