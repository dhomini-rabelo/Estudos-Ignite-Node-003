import { IRepository } from '@/domain/core/adapters/database/repository/base'
import { IPetProps, Pet } from '../../enterprise/entities/pet'

export type IPetRepository = IRepository<Pet, IPetProps>
