import { IPetProps, Pet } from '../../../enterprise/entities/pet'

export interface IPetRepository {
  create(props: IPetProps): Promise<Pet>
  findUniqueById(id: string): Promise<Pet>
  findMany(params: IPetProps): Promise<Pet[]>
}
