import {
  IPetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../core/use-cases/base'
import { IPetRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/pet'
import { IInstitutionRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/institution'

export class CreatePetUseCase implements IBaseUseCase {
  constructor(
    private petRepository: IPetRepository,
    private institutionRepository: IInstitutionRepository,
  ) {}

  async execute(request: Omit<IPetProps, 'IBGECode'>): Promise<Pet> {
    const institution = await this.institutionRepository.findUniqueById(
      request.institutionId.toValue(),
    )
    return this.petRepository.create({
      ...request,
      IBGECode: institution.address.IBGECode,
    })
  }
}
