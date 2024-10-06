import { PetFactory } from '@/domain/bounded-contexts/pet-app/__tests__/factories/pet'
import { InMemoryPetRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/pet'
import { Pet } from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'
import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'
import { some } from '@tests/utils/some'

import { ReadPetUseCase } from './read'

describe('ReadPetUseCase', () => {
  const petRepository = new InMemoryPetRepository()
  const petFactory = new PetFactory(petRepository)
  const sut = new ReadPetUseCase(petRepository)

  beforeEach(async () => {
    await petRepository.reset()
  })

  it('should read a pet data', async () => {
    const pet = await petFactory.create()

    const response = await sut.execute({
      id: pet.id.toValue(),
    })

    expect(response).toBeInstanceOf(Pet)
  })

  it('should throw ResourceNotFoundError when pet not exists', async () => {
    await expect(async () => {
      await sut.execute({
        id: some.text(),
      })
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
