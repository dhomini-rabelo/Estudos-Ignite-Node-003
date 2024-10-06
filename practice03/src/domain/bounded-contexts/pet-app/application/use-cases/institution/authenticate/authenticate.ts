import { HashModule } from '@/adapters/hash'
import { JWTModule } from '@/adapters/jwt'
import { InstitutionRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/institution'
import { IBaseUseCase } from '@/domain/core/use-cases/base'

import { InvalidCredentialsError } from './errors/invalid-credentials'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  accessToken: string
}

export class AuthenticateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: InstitutionRepository,
    private hash: HashModule,
    private jwt: JWTModule,
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
