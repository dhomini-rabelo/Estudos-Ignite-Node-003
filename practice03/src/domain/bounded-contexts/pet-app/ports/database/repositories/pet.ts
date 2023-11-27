import { IPetProps, Pet } from '../../../enterprise/entities/pet'
import { IRepository } from './base'

export type IPetRepository = IRepository<Pet, IPetProps>
