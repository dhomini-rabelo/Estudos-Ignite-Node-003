import { IEntity } from '../../../../core/entities/base'
import { ID } from '../../../../core/entities/id'

export interface PetProps {
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

export class Pet extends IEntity<PetProps> {
  static create(props: PetProps) {
    return new Pet(props)
  }

  static reference(id: ID, props: PetProps) {
    return new Pet(props, id)
  }
}
