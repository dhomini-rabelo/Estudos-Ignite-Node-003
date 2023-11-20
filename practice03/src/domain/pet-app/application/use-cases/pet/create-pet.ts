import { IPetProps, Pet } from '@/domain/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../core/use-cases/base'
import { IPetRepository } from '@/domain/pet-app/ports/database/repositories/pet'

export class CreatePetUseCase implements IBaseUseCase {
  constructor(private petRepository: IPetRepository) { }

  async execute(request: IPetProps): Promise<Pet> {
    return this.petRepository.create({
      ...request,
    })
  }
}
