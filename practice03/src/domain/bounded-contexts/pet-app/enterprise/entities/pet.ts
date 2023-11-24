import { IEntity } from '../core/entities/base'
import { ID } from '../core/entities/id'

export interface IPetProps {
  name: string
  description: string
  animalType: 'cat' | 'dog'
  lifeStage: 'junior' | 'adult' | 'senior'
  size: 'small' | 'medium' | 'large'
  energyLevel: 'small' | 'medium' | 'large'
  independenceLevel: 'small' | 'medium' | 'large'
  environmentSize: 'small' | 'medium' | 'large'
  IBGECode: string
  institutionId: ID
}

export class Pet extends IEntity<IPetProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get animalType() {
    return this.props.animalType
  }

  get lifeStage() {
    return this.props.lifeStage
  }

  get size() {
    return this.props.size
  }

  get energyLevel() {
    return this.props.energyLevel
  }

  get independenceLevel() {
    return this.props.independenceLevel
  }

  get environmentSize() {
    return this.props.environmentSize
  }

  get IBGECode() {
    return this.props.IBGECode
  }

  get institutionId() {
    return this.props.institutionId
  }

  static create(props: IPetProps) {
    return new Pet(props)
  }

  static reference(id: ID, props: IPetProps) {
    return new Pet(props, id)
  }
}
