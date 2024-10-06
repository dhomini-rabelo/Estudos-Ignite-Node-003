import { Repository } from '@/domain/core/adapters/repository'

import { Pet } from '../../enterprise/entities/pet'

export type PetRepository = Repository<Pet>
