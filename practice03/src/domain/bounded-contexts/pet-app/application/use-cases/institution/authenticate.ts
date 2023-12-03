import { IInstitutionRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/institution'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import { IHash } from '@/adapters/hash/contract'
import { InvalidCredentialsError } from '../../errors/invalid-credentials'
import { IJWT } from '@/adapters/jwt/contract'

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
    private jwt: IJWT,
  ) {}

  async execute(request: IRequest): Promise<IResponse> {
    const institution = await this.institutionRepository.findUnique({
      email: request.email,
    })

    if (
      institution &&
      this.passwordIsCorrect(request.password, institution.password)
    ) {
      return {
        accessToken: this.jwt.generateToken(institution.id.toString()),
      }
    }

    throw new InvalidCredentialsError()
  }

  passwordIsCorrect(requestPassword: string, hashedPassword: string) {
    return this.hash.compare(requestPassword, hashedPassword)
  }
}
