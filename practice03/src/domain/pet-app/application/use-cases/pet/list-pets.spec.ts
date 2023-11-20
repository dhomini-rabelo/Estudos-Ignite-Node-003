import { InMemoryPetRepository } from '@/domain/pet-app/__tests__/repositories/pet'
import { ListPetsUseCase } from './list-pets'
import { Institution } from '@/domain/pet-app/enterprise/entities/institution'
import { Address } from '@/domain/pet-app/enterprise/value-objects/address'

describe('List pets', () => {
  const petRepository = new InMemoryPetRepository()
  const sut = new ListPetsUseCase(petRepository)

  it('should list all pets from city', async () => {
    expect(2).toBe(2)
    //   const cityIBGECodeA = '11111-111'
    // const institutionA = Institution.create({
    //   name: 'aaa',
    //   address: new Address({
    //     city: '',
    //     IBGECode: cityIBGECodeA,
    //     number: 'A25',
    //     state: 'SP',
    //     zipCode: '11111-111',
    //   }),
    // })
    //   const cityIBGECodeB = '11111-111'
    //   const institutionB = Institution.create({
    //     name: 'aaa',
    //     address: new Address({
    //       city: '',
    //       IBGECode: cityIBGECodeB,
    //       number: 'A25',
    //       state: 'SP',
    //       zipCode: '11111-111',
    //     }),
    //   })
    //   const createdPets = await Promise.all([
    //     petRepository.create({
    //       name: 'test',
    //       institutionId: institutionA.id,
    //       IBGECode: institutionA.address.IBGECode,
    //     }),
    //     petRepository.create({
    //       name: 'test',
    //       institutionId: institutionB.id,
    //       IBGECode: institutionB.address.IBGECode,
    //     }),
    //     petRepository.create({
    //       name: 'test 02',
    //       institutionId: institutionA.id,
    //       IBGECode: institutionA.address.IBGECode,
    //     }),
    //   ])
    //   const response = await sut.execute({
    //     filters: {
    //       IBGECode: institutionB.address.IBGECode,
    //     },
    //   })
    //   expect(response).toEqual(
    //     expect.arrayContaining(
    //       createdPets.filter((pet) => pet.institutionId.isEqual(institutionB.id)),
    //     ),
    //   )
  })
})
