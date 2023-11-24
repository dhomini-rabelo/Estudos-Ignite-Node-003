import { Pet } from '../../../enterprise/entities/pet'
import { IRepository } from './base'

export interface IPetRepository<Entity, Props>
  extends IRepository<Entity, Props> {
  findUniqueById(id: string): Promise<Pet>
}
