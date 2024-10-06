import { InstitutionRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/institution'
import { PetRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/pet'
import {
  PetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { ID } from '@/domain/core/entities/id'

import { UseCase } from '../../../../../core/use-cases/base'

interface Payload extends Omit<PetProps, 'IBGECode' | 'institutionId'> {
  institutionId: string
}

export class CreatePetUseCase implements UseCase {
  constructor(
    private petRepository: PetRepository,
    private institutionRepository: InstitutionRepository,
  ) {}

  async execute(payload: Payload): Promise<Pet> {
    const institution = await this.institutionRepository.get({
      id: new ID(payload.institutionId),
    })

    return this.petRepository.create({
      ...payload,
      institutionId: new ID(payload.institutionId),
      IBGECode: institution.props.address.value.IBGECode,
    })
  }
}
