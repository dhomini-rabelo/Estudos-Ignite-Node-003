import { InMemoryPetRepository } from '@/domain/pet-app/__tests__/repositories/pet'
import { CreatePetUseCase } from './create'
import { InMemoryInstitutionRepository } from '@/domain/pet-app/__tests__/repositories/institution'
import { makeInstitutionData } from '@/domain/pet-app/__tests__/factories/institution'
import { ResourceNotFoundError } from '@/domain/pet-app/ports/database/errors/resource-not-found'
import { ID } from '@/domain/pet-app/enterprise/core/entities/id'
import { makePetData } from '@/domain/pet-app/__tests__/factories/pet'

describe('CreatePetUseCase', () => {
  const petRepository = new InMemoryPetRepository()
  const institutionRepository = new InMemoryInstitutionRepository()
  const sut = new CreatePetUseCase(petRepository, institutionRepository)

  beforeEach(async () => {
    await petRepository.reset()
    await institutionRepository.reset()
  })

  it('should create a pet', async () => {
    const institution = await institutionRepository.create(
      makeInstitutionData(),
    )

    const response = await sut.execute(
      makePetData({ institutionId: institution.id }),
    )

    expect(response.id.toString()).toEqual(expect.any(String))
    expect(
      (await petRepository.findUniqueById(response.id.toString())).isEqual(
        response,
      ),
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
