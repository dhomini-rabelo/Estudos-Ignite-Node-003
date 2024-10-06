import { createPetData } from '@/domain/bounded-contexts/pet-app/__tests__/factories/pet'
import { InMemoryPetRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/pet'
import { some } from '@tests/utils/some'

import { ListPetsUseCase } from './list'

describe('ListPetsUseCase', () => {
  const petRepository = new InMemoryPetRepository()
  const sut = new ListPetsUseCase(petRepository)

  beforeEach(async () => {
    await petRepository.reset()
  })

  it('should list all pets from city', async () => {
    const cityIBGECodeA = some.text()
    const cityIBGECodeB = some.text()
    const createdPets = await Promise.all([
      petRepository.create(createPetData({ IBGECode: cityIBGECodeA })),
      petRepository.create(createPetData({ IBGECode: cityIBGECodeB })),
      petRepository.create(createPetData({ IBGECode: cityIBGECodeA })),
    ])

    const response = await sut.execute({
      IBGECode: cityIBGECodeA,
    })

    expect(response.length).toBe(2)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter((pet) => pet.IBGECode === cityIBGECodeA),
      ),
    )
  })

  it('should filter pets by IBGECode and lifeStage', async () => {
    const cityIBGECode = some.text()
    const createdPets = await Promise.all([
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, lifeStage: 'junior' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, lifeStage: 'adult' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, lifeStage: 'senior' }),
      ),
    ])

    const response = await sut.execute({
      IBGECode: cityIBGECode,
      lifeStage: 'junior',
    })

    expect(response.length).toBe(1)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter((pet) => pet.lifeStage === 'junior'),
      ),
    )
  })

  it('should filter pets by IBGECode and energyLevel', async () => {
    const cityIBGECode = some.text()
    const createdPets = await Promise.all([
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, energyLevel: 'small' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, energyLevel: 'medium' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, energyLevel: 'large' }),
      ),
    ])

    const response = await sut.execute({
      IBGECode: cityIBGECode,
      energyLevel: 'small',
    })

    expect(response.length).toBe(1)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter((pet) => pet.energyLevel === 'small'),
      ),
    )
  })

  it('should filter pets by IBGECode and size', async () => {
    const cityIBGECode = some.text()
    const createdPets = await Promise.all([
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, size: 'small' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, size: 'small' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, size: 'large' }),
      ),
    ])

    const response = await sut.execute({
      IBGECode: cityIBGECode,
      size: 'small',
    })

    expect(response.length).toBe(2)
    expect(response).toEqual(
      expect.arrayContaining(createdPets.filter((pet) => pet.size === 'small')),
    )
  })

  it('should filter pets by IBGECode and independenceLevel', async () => {
    const cityIBGECode = some.text()
    const createdPets = await Promise.all([
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, independenceLevel: 'small' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, independenceLevel: 'small' }),
      ),
      petRepository.create(
        createPetData({ IBGECode: cityIBGECode, independenceLevel: 'large' }),
      ),
    ])

    const response = await sut.execute({
      IBGECode: cityIBGECode,
      independenceLevel: 'small',
    })

    expect(response.length).toBe(2)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter((pet) => pet.independenceLevel === 'small'),
      ),
    )
  })

  it('should filter pets by IBGECode, lifeStage, energyLevel, size and independenceLevel', async () => {
    const cityIBGECode = some.text()
    const createdPets = await Promise.all([
      // found pets
      petRepository.create(
        createPetData({
          IBGECode: cityIBGECode,
          lifeStage: 'junior',
          energyLevel: 'small',
          size: 'small',
          independenceLevel: 'small',
        }),
      ),
      petRepository.create(
        createPetData({
          IBGECode: cityIBGECode,
          lifeStage: 'junior',
          energyLevel: 'small',
          size: 'small',
          independenceLevel: 'small',
        }),
      ),
      // not found pets
      petRepository.create(
        createPetData({
          IBGECode: cityIBGECode,
          lifeStage: 'senior',
          energyLevel: 'small',
          size: 'small',
          independenceLevel: 'small',
        }),
      ),
      petRepository.create(
        createPetData({
          IBGECode: cityIBGECode,
          lifeStage: 'junior',
          energyLevel: 'medium',
          size: 'small',
          independenceLevel: 'small',
        }),
      ),
      petRepository.create(
        createPetData({
          IBGECode: cityIBGECode,
          lifeStage: 'junior',
          energyLevel: 'small',
          size: 'medium',
          independenceLevel: 'small',
        }),
      ),
      petRepository.create(
        createPetData({
          IBGECode: cityIBGECode,
          lifeStage: 'junior',
          energyLevel: 'small',
          size: 'small',
          independenceLevel: 'large',
        }),
      ),
    ])

    const response = await sut.execute({
      IBGECode: cityIBGECode,
      lifeStage: 'junior',
      energyLevel: 'small',
      size: 'small',
      independenceLevel: 'small',
    })

    expect(response.length).toBe(2)
    expect(response).toEqual(
      expect.arrayContaining(
        createdPets.filter(
          (pet) =>
            pet.lifeStage === 'junior' &&
            pet.energyLevel === 'small' &&
            pet.size === 'small' &&
            pet.independenceLevel === 'small',
        ),
      ),
    )
  })
})
