import { InMemoryPetRepository } from '@/domain/pet-app/__tests__/repositories/pet'
import { CreatePetUseCase } from './create-pet'

describe('Create a pet', () => {
  const petRepository = new InMemoryPetRepository()
  const sut = new CreatePetUseCase(petRepository)

  it('should create a pet', async () => {
    const response = await sut.execute({
      name: 'test',
    })
    expect(response.id.toString()).toEqual(expect.any(String))
  })
})
