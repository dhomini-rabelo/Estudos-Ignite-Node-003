import { InMemoryPetRepository } from '@/domain/pet-app/__tests__/repositories/pet'
import { ReadPetUseCase } from './read'
import { makePetData } from '@/domain/pet-app/__tests__/factories/pet'
import { Pet } from '@/domain/pet-app/enterprise/entities/pet'

describe('Read a pet data', () => {
  const petRepository = new InMemoryPetRepository()
  const sut = new ReadPetUseCase(petRepository)

  beforeEach(async () => {
    await petRepository.reset()
  })

  it('should read a pet data', async () => {
    const pet = await petRepository.create(makePetData())

    const response = await sut.execute({
      id: pet.id.toValue(),
    })

    expect(response).toBeInstanceOf(Pet)
  })
})
