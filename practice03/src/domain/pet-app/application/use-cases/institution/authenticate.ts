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
        accessToken: '',
      }
    }

    throw new InvalidCredentialsError()
  }

  passwordIsCorrect(requestPassword: string, hashedPassword: string) {
    return this.hash.compare(requestPassword, hashedPassword)
  }
}
