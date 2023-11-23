import { InMemoryInstitutionRepository } from '@/domain/pet-app/__tests__/repositories/institution'
import { HashMock } from '@/domain/pet-app/__tests__/mocks/hash'
import { AuthenticateInstitutionUseCase } from './authenticate'
import { makeInstitutionData } from '@/domain/pet-app/__tests__/factories/institution'
import { some } from '@tests/utils/some'
import { InvalidCredentialsError } from '../../core/errors/invalid-credentials'

describe('AuthenticateInstitutionUseCase', () => {
  const JWT_TOKEN_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  const institutionRepository = new InMemoryInstitutionRepository()
  const hashMock = new HashMock()
  const sut = new AuthenticateInstitutionUseCase(
    institutionRepository,
    hashMock,
  )

  beforeEach(async () => {
    await institutionRepository.reset()
  })

  it('should generate a access token', async () => {
    const institution = await institutionRepository.create(
      makeInstitutionData(),
    )

    const response = await sut.execute({
      email: institution.email,
      password: institution.password,
    })

    expect(response).toEqual({ accessToken: expect.any(String) })
  })

  it('should generate a access token with JWT format', async () => {
    const institution = await institutionRepository.create(
      makeInstitutionData(),
    )

    const response = await sut.execute({
      email: institution.email,
      password: institution.password,
    })

    expect(JWT_TOKEN_REGEX.test(response.accessToken)).toBeTruthy()
  })

  it('should throw InvalidCredentialsError for nonexistent email', async () => {
    await expect(async () => {
      await sut.execute({
        email: some.text(),
        password: some.text(),
      })
    }).rejects.toThrow(InvalidCredentialsError)
  })

  it('should throw InvalidCredentialsError for incorrect password', async () => {
    const institution = await institutionRepository.create(
      makeInstitutionData(),
    )

    await expect(async () => {
      await sut.execute({
        email: institution.email,
        password: some.text(),
      })
    }).rejects.toThrow(InvalidCredentialsError)
  })
})
