import { createPetData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/pet'
import { InMemoryPetRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/pet'
import { Pet } from '@/domain/bounded-contexts/pet-app/enterprise/entities/pet'

import { ReadPetUseCase } from './read'

describe('ReadPetUseCase', () => {
  const petRepository = new InMemoryPetRepository()
  const sut = new ReadPetUseCase(petRepository)

  beforeEach(async () => {
    await petRepository.reset()
  })

  it('should read a pet data', async () => {
    const pet = await petRepository.create(createPetData())

    const response = await sut.execute({
      id: pet.id.toValue(),
    })

    expect(response).toBeInstanceOf(Pet)
  })
})
