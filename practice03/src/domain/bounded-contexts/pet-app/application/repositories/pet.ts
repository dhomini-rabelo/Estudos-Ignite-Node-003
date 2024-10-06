import { IRepository } from '@/domain/core/adapters/repository'

import { PetProps, Pet } from '../../enterprise/entities/pet'

export type PetRepository = IRepository<Pet, PetProps>
