import { Pet } from '@/domain/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../core/use-cases/base'
import { IPetRepository } from '@/domain/pet-app/ports/database/repositories/pet'

interface IRequest {
  filters: {
    ibgeCode: string
  }
}

export class ListPetsUseCase implements IBaseUseCase {
  constructor(private petRepository: IPetRepository) { }

  async execute(request: IRequest): Promise<Pet> {
    return this.petRepository.findMany(request.filters.ibgeCode)
  }
}
