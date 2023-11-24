import { IPetProps, Pet } from '../../../enterprise/entities/pet'
import { IRepository } from './base'

export interface IPetRepository extends IRepository<Pet, IPetProps> {
  findUniqueById(id: string): Promise<Pet>
}
