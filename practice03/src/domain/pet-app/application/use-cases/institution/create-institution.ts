import { IInstitutionRepository } from '@/domain/pet-app/ports/database/repositories/institution'
import { IBaseUseCase } from '../../core/use-cases/base'
import { IInstitutionProps, Institution } from '@/domain/pet-app/enterprise/entities/institution'

export class CreateInstitutionUseCase implements IBaseUseCase {
  constructor(private institutionRepository: IInstitutionRepository) { }

  async execute(request: IInstitutionProps): Promise<Institution> {
    return this.institutionRepository.create({
      ...request,
    })
  }
}
