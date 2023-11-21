import { InMemoryPetRepository } from '@/domain/pet-app/__tests__/repositories/pet'
import { ListPetsUseCase } from './list-pets'
import { makePetData } from '@/domain/pet-app/__tests__/factories/pet'
import { some } from '@tests/utils/some'

describe('List pets', () => {
  const petRepository = new InMemoryPetRepository()
  const sut = new ListPetsUseCase(petRepository)

  beforeEach(async () => {
    await petRepository.reset()
  })

  it('should list all pets from city', async () => {
    const cityIBGECodeA = some.text()
    const cityIBGECodeB = some.text()
    const createdPets = await Promise.all([
      petRepository.create(makePetData({ IBGECode: cityIBGECodeA })),
      petRepository.create(makePetData({ IBGECode: cityIBGECodeB })),
      petRepository.create(makePetData({ IBGECode: cityIBGECodeA })),
    ])

    const response = await sut.execute({
      filters: {
        IBGECode: cityIBGECodeA,
      },
    })

    expect(response.length).toBe(2)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter((pet) => pet.IBGECode === cityIBGECodeA),
      ),
    )
  })

  it('should filter pets by lifeStage', async () => {
    const cityIBGECode = some.text()
    const createdPets = await Promise.all([
      petRepository.create(
        makePetData({ IBGECode: cityIBGECode, lifeStage: 'junior' }),
      ),
      petRepository.create(
        makePetData({ IBGECode: cityIBGECode, lifeStage: 'adult' }),
      ),
      petRepository.create(
        makePetData({ IBGECode: cityIBGECode, lifeStage: 'senior' }),
      ),
    ])

    const response = await sut.execute({
      filters: {
        IBGECode: cityIBGECode,
        lifeStage: 'junior',
      },
    })

    console.log({
      pets: createdPets.filter((pet) => pet.lifeStage === 'junior'),
      response,
    })

    expect(response.length).toBe(1)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter((pet) => pet.lifeStage === 'junior'),
      ),
    )
  })
})
