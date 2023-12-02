import {
  IPetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import { IPetRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/pet'
import { IInstitutionRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/institution'
import { ID } from '@/domain/core/entities/id'

interface IRequest extends Omit<IPetProps, 'IBGECode' | 'institutionId'> {
  institutionId: string
}

export class CreatePetUseCase implements IBaseUseCase {
  constructor(
    private petRepository: IPetRepository,
    private institutionRepository: IInstitutionRepository,
  ) {}

  async execute(request: IRequest): Promise<Pet> {
    const institution = await this.institutionRepository.get({
      id: new ID(request.institutionId),
    })
    return this.petRepository.create({
      ...request,
      institutionId: new ID(request.institutionId),
      IBGECode: institution.address.IBGECode,
    })
  }
}
