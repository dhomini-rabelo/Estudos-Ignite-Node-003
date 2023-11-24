import {
  IPetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../core/use-cases/base'
import { IPetRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/pet'

type IPetItemData = Omit<
  IPetProps,
  'description' | 'environmentSize' | 'institutionId' | 'IBGECode'
>

interface IFilters extends Partial<Omit<IPetItemData, 'name' | 'animalType'>> {
  IBGECode: string
}

interface IRequest {
  filters: IFilters
}

export class ListPetsUseCase implements IBaseUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(request: IRequest): Promise<Pet[]> {
    return this.petRepository.findMany(request.filters)
  }
}
