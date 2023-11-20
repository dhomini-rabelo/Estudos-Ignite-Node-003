import { InMemoryPetRepository } from '@/domain/pet-app/__tests__/repositories/pet'
import { CreatePetUseCase } from './create-pet'
import { InMemoryInstitutionRepository } from '@/domain/pet-app/__tests__/repositories/institution'
import { makeInstitutionData } from '@/domain/pet-app/__tests__/factories/institution'
import { ResourceNotFoundError } from '@/domain/pet-app/ports/database/errors/resource-not-found'
import { ID } from '@/domain/pet-app/enterprise/core/entities/id'

describe('Create a pet', () => {
  const petRepository = new InMemoryPetRepository()
  const institutionRepository = new InMemoryInstitutionRepository()
  const sut = new CreatePetUseCase(petRepository, institutionRepository)

  it('should create a pet', async () => {
    const institution = await institutionRepository.create(
      await makeInstitutionData(),
    )

    const response = await sut.execute({
      name: 'test',
      institutionId: institution.id,
    })

    expect(response.id.toString()).toEqual(expect.any(String))
    expect(
      (await petRepository.findUniqueById(response.id.toString())).isEqual(
        response,
      ),
    ).toBeTruthy()
  })

  it('should ensure that the pet.IBGECode is the same as the institution.IBGECode', async () => {
    const institution = await institutionRepository.create(
      await makeInstitutionData(),
    )

    const response = await sut.execute({
      name: 'test',
      institutionId: institution.id,
    })

    expect(response.IBGECode).toEqual(institution.address.IBGECode)
  })

  it('should throw ResourceNotFoundError when institution not exists', async () => {
    await expect(async () => {
      await sut.execute({
        name: 'test',
        institutionId: new ID(),
      })
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
