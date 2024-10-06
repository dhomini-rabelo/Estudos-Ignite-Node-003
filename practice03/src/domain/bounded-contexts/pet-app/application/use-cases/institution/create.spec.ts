import { InMemoryInstitutionRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/institution'
import { CreateInstitutionUseCase } from './create'
import { AddressGeneratorMock } from '@tests/mocks/adapters/address'
import { some } from '@tests/utils/some'
import { HashMock } from '@tests/mocks/adapters/hash'

describe('CreateInstitutionUseCase', () => {
  const institutionRepository = new InMemoryInstitutionRepository()
  const addressGeneratorMock = new AddressGeneratorMock()
  const hashMock = new HashMock()
  const sut = new CreateInstitutionUseCase(
    institutionRepository,
    addressGeneratorMock,
    hashMock,
  )

  beforeEach(async () => {
    await institutionRepository.reset()
  })

  it('should create a institution', async () => {
    const response = await sut.execute({
      name: 'test',
      zipCode: '12345-780',
      cellNumber: '(99) 99999999',
      email: 'test@test.com',
      password: 'xxxx',
    })

    expect(response.id.toString()).toEqual(expect.any(String))
    expect(
      (await institutionRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })

  it('should create a institution with hashed password', async () => {
    const password = some.text()

    const response = await sut.execute({
      name: 'test',
      zipCode: '12345-780',
      cellNumber: '(99) 99999999',
      email: 'test@test.com',
      password,
    })

    expect(password).not.toBe(response.password)
  })
})
