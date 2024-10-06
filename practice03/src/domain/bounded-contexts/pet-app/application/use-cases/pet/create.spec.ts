import { InstitutionFactory } from '@/domain/bounded-contexts/pet-app/__tests__/factories/institution'
import { createPetData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/pet'
import { InMemoryInstitutionRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/institution'
import { InMemoryPetRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/pet'
import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'
import { ID } from '@/domain/core/entities/id'

import { PetProps } from '../../../enterprise/entities/pet'
import { CreatePetUseCase } from './create'

const createPayload = (petProps: PetProps) => ({
  ...petProps,
  institutionId: petProps.institutionId.toValue(),
})

describe('CreatePetUseCase', () => {
  const petRepository = new InMemoryPetRepository()
  const institutionRepository = new InMemoryInstitutionRepository()
  const institutionFactory = new InstitutionFactory(institutionRepository)
  const sut = new CreatePetUseCase(petRepository, institutionRepository)

  beforeEach(async () => {
    await petRepository.reset()
    await institutionRepository.reset()
  })

  it('should create a pet', async () => {
    const institution = await institutionFactory.create()

    const response = await sut.execute(
      createPayload(createPetData({ institutionId: institution.id })),
    )

    expect(response.id.toString()).toEqual(expect.any(String))
    expect(
      (await petRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })

  it('should ensure that the pet.IBGECode is the same as the institution.IBGECode', async () => {
    const institution = await institutionFactory.create()

    const response = await sut.execute(
      createPayload(createPetData({ institutionId: institution.id })),
    )

    expect(response.props.IBGECode).toEqual(
      institution.props.address.props.IBGECode,
    )
  })

  it('should throw ResourceNotFoundError when institution not exists', async () => {
    await expect(async () => {
      await sut.execute(
        createPayload(createPetData({ institutionId: new ID() })),
      )
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
