import { InMemoryPetRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/pet'
import { CreatePetUseCase } from './create'
import { InMemoryInstitutionRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/institution'
import { makeInstitutionData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/institution'
import { ResourceNotFoundError } from '@/domain/bounded-contexts/pet-app/ports/database/errors/resource-not-found'
import { ID } from '@/domain/core/entities/id'
import { makePetData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/pet'
import { ValidationError } from '../../core/errors/validation-error/error'

describe('CreatePetUseCase', () => {
  const petRepository = new InMemoryPetRepository()
  const institutionRepository = new InMemoryInstitutionRepository()
  const sut = new CreatePetUseCase(petRepository, institutionRepository)

  beforeEach(async () => {
    await petRepository.reset()
    await institutionRepository.reset()
  })

  describe('Business Rules', () => {
    it('should create a pet', async () => {
      const institution = await institutionRepository.create(
        makeInstitutionData(),
      )

      const response = await sut.execute(
        makePetData({ institutionId: institution.id }),
      )

      expect(response.id.toString()).toEqual(expect.any(String))
      expect(
        (await petRepository.get({ id: response.id })).isEqual(response),
      ).toBeTruthy()
    })

    it('should ensure that the pet.IBGECode is the same as the institution.IBGECode', async () => {
      const institution = await institutionRepository.create(
        makeInstitutionData(),
      )

      const response = await sut.execute(
        makePetData({ institutionId: institution.id }),
      )

      expect(response.IBGECode).toEqual(institution.address.IBGECode)
    })

    it('should throw ResourceNotFoundError when institution not exists', async () => {
      await expect(async () => {
        await sut.execute(makePetData({ institutionId: new ID() }))
      }).rejects.toThrow(ResourceNotFoundError)
    })
  })

  describe('Data Validation', () => {
    it('should throw ValidationError when data are invalid', async () => {
      await expect(async () => {
        await sut.execute({} as any)
      }).rejects.toThrow(ValidationError)
    })
  })
})
