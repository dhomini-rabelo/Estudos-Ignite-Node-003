import {
  IPetProps,
  Pet,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import { IPetRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/pet'
import { IInstitutionRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/institution'
import * as zod from 'zod'
import { ErrorMessages } from '../../core/errors/validation-error/messages'
import { ValidationError } from '../../core/errors/validation-error/error'

export class CreatePetUseCase implements IBaseUseCase {
  constructor(
    private petRepository: IPetRepository,
    private institutionRepository: IInstitutionRepository,
  ) {}

  async execute(request: Omit<IPetProps, 'IBGECode'>): Promise<Pet> {
    const validatedData = this.validate(request)
    const institution = await this.institutionRepository.get({
      id: request.institutionId,
    })
    return this.petRepository.create({
      ...request,
      IBGECode: institution.address.IBGECode,
    })
  }

  private validate(data: unknown) {
    const schema = zod.object({
      name: zod.string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      }),
      // .min(3, DynamicErrors.minLength(3))
    })

    try {
      return schema.parse(data)
    } catch {
      throw new ValidationError()
    }
  }
}
