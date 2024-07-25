import {
  IPetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import { IPetRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/pet'

type IFilters = Pick<
  IPetProps,
  | 'lifeStage'
  | 'energyLevel'
  | 'size'
  | 'independenceLevel'
  | 'IBGECode'
  | 'animalType'
  | 'institutionId'
>

interface IRequest {
  filters: Partial<IFilters>
}

export class ListPetsUseCase implements IBaseUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(request: IRequest): Promise<Pet[]> {
    return this.petRepository.findMany(request.filters)
  }
}
