import { ErrorMessages } from '@/domain/core/use-cases/errors/validation-error/messages'
import * as zod from 'zod'

export const PetDTOFields = {
  name: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  description: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  animalType: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  lifeStage: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  size: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  energyLevel: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  independenceLevel: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  environmentSize: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  IBGECode: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  institutionId: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
}

export const CreatePetDTO = zod.object({
  name: PetDTOFields.name,
  description: PetDTOFields.description,
  animalType: PetDTOFields.animalType,
  lifeStage: PetDTOFields.lifeStage,
  size: PetDTOFields.size,
  energyLevel: PetDTOFields.energyLevel,
  independenceLevel: PetDTOFields.independenceLevel,
  environmentSize: PetDTOFields.environmentSize,
  IBGECode: PetDTOFields.IBGECode,
  institutionId: PetDTOFields.institutionId,
})
