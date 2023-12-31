import { InMemoryPetRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/pet'
import { CreatePetUseCase } from './create'
import { InMemoryInstitutionRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/institution'
import { makeInstitutionData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/institution'
import { ResourceNotFoundError } from '@/domain/core/adapters/database/errors/resource-not-found'
import { ID } from '@/domain/core/entities/id'
import { makePetData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/pet'
import { IPetProps } from '../../../enterprise/entities/pet'

const makeRequest = (petProps: IPetProps) => ({
  ...petProps,
  institutionId: petProps.institutionId.toValue(),
})

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
      makeRequest(makePetData({ institutionId: institution.id })),
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
      makeRequest(makePetData({ institutionId: institution.id })),
    )

    expect(response.IBGECode).toEqual(institution.address.IBGECode)
  })

  it('should throw ResourceNotFoundError when institution not exists', async () => {
    await expect(async () => {
      await sut.execute(makeRequest(makePetData({ institutionId: new ID() })))
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
