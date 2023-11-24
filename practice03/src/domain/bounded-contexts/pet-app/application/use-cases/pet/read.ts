import { Pet } from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import { IPetRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/pet'

export class ReadPetUseCase implements IBaseUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(request: { id: string }): Promise<Pet> {
    return this.petRepository.findUniqueById(request.id)
  }
}
