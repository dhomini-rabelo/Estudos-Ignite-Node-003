import { InstitutionFactory } from '@/domain/bounded-contexts/pet-app/__tests__/factories/institution'
import { InMemoryInstitutionRepository } from '@/domain/bounded-contexts/pet-app/__tests__/repositories/institution'
import { HashMock } from '@tests/mocks/adapters/hash'
import { JWTMock } from '@tests/mocks/adapters/jwt'
import { some } from '@tests/utils/some'

import { AuthenticateInstitutionUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials'

describe('AuthenticateInstitutionUseCase', () => {
  const JWT_TOKEN_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  const institutionRepository = new InMemoryInstitutionRepository()
  const institutionFactory = new InstitutionFactory(institutionRepository)
  const hashModule = new HashMock()
  const sut = new AuthenticateInstitutionUseCase(
    institutionRepository,
    hashModule,
    new JWTMock(),
  )

  beforeEach(async () => {
    await institutionRepository.reset()
  })

  it('should generate a access token with JWT format', async () => {
    const rawPassword = some.text()
    const institution = await institutionFactory.create({
      password: hashModule.generate(rawPassword),
    })

    const response = await sut.execute({
      email: institution.email,
      password: rawPassword,
    })

    expect(JWT_TOKEN_REGEX.test(response.accessToken)).toBeTruthy()
  })

  it('should generate a different access token for each run with the same institution', async () => {
    const rawPassword = some.text()
    const institution = await institutionFactory.create({
      password: hashModule.generate(rawPassword),
    })

    const firstResponse = await sut.execute({
      email: institution.email,
      password: rawPassword,
    })
    const secondResponse = await sut.execute({
      email: institution.email,
      password: rawPassword,
    })

    expect(
      firstResponse.accessToken !== secondResponse.accessToken,
    ).toBeTruthy()
  })

  it('should generate a different access token for different institutions', async () => {
    const rawPasswordA = some.text()
    const institutionA = await institutionFactory.create({
      password: hashModule.generate(rawPasswordA),
    })
    const rawPasswordB = some.text()
    const institutionB = await institutionFactory.create({
      password: hashModule.generate(rawPasswordB),
    })

    const firstResponse = await sut.execute({
      email: institutionA.email,
      password: rawPasswordA,
    })
    const secondResponse = await sut.execute({
      email: institutionB.email,
      password: rawPasswordB,
    })

    expect(
      firstResponse.accessToken !== secondResponse.accessToken,
    ).toBeTruthy()
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
    const institution = await institutionFactory.create()

    await expect(async () => {
      await sut.execute({
        email: institution.email,
        password: some.text(),
      })
    }).rejects.toThrow(InvalidCredentialsError)
  })
})
