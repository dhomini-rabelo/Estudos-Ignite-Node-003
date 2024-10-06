import { IRepository } from '@/domain/core/adapters/repository'
import { IPetProps, Pet } from '../../enterprise/entities/pet'

export type IPetRepository = IRepository<Pet, IPetProps>
