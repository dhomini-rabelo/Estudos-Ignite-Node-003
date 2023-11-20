import { InMemoryInstitutionRepository } from '@/domain/pet-app/__tests__/repositories/institution'
import { CreateInstitutionUseCase } from './create-institution'

describe('Create a institution', () => {
  const institutionRepository = new InMemoryInstitutionRepository()
  const sut = new CreateInstitutionUseCase(institutionRepository)

  it('should create a institution', async () => {
    const response = await sut.execute({
      name: 'test',
    })
    expect(response.id.toString()).toEqual(expect.any(String))
    expect(
      (await institutionRepository.findUniqueById(response.id.toString())).isEqual(response)
    ).toBeTruthy()
  })
})
