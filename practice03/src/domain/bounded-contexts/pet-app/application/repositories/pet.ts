import { Repository } from '@/domain/core/adapters/repository'

import { PetProps, Pet } from '../../enterprise/entities/pet'

export type PetRepository = Repository<Pet, PetProps>
