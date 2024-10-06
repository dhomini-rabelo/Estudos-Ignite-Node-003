import { IRepository } from '@/domain/core/adapters/repository'

import { IPetProps, Pet } from '../../enterprise/entities/pet'

export type PetRepository = IRepository<Pet, IPetProps>
