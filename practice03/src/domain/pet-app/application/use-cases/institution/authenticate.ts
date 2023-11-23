import { IInstitutionRepository } from '@/domain/pet-app/ports/database/repositories/institution'
import { IBaseUseCase } from '../../core/use-cases/base'
import { IHash } from '@/domain/pet-app/ports/hash/contract'
import { InvalidCredentialsError } from '../../core/errors/invalid-credentials'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  accessToken: string
}

export class AuthenticateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: IInstitutionRepository,
    private hash: IHash,
  ) {}

  async execute(request: IRequest): Promise<IResponse> {
    const institution = await this.institutionRepository.findUniqueByEmail(
      request.email,
    )

    if (
      institution &&
      this.passwordIsCorrect(request.password, institution.password)
    ) {
      return {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      }
    }

    throw new InvalidCredentialsError()
  }

  passwordIsCorrect(requestPassword: string, hashedPassword: string) {
    return this.hash.compare(requestPassword, hashedPassword)
  }
}
