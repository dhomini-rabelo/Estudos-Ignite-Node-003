import { HashModule } from '@/adapters/hash'
import { JWTModule } from '@/adapters/jwt'
import { InstitutionRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/institution'
import { IBaseUseCase } from '@/domain/core/use-cases/base'

import { InvalidCredentialsError } from './errors/invalid-credentials'

interface Payload {
  email: string
  password: string
}

interface Response {
  accessToken: string
}

export class AuthenticateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: InstitutionRepository,
    private hashModule: HashModule,
    private jwtModule: JWTModule,
  ) {}

  async execute(payload: Payload): Promise<Response> {
    const institution = await this.institutionRepository.findUnique({
      email: payload.email,
    })

    if (
      institution &&
      this.passwordIsCorrect(payload.password, institution.password)
    ) {
      return {
        accessToken: this.jwtModule.generateToken(institution.id.toString()),
      }
    }

    throw new InvalidCredentialsError()
  }

  private passwordIsCorrect(
    payloadPassword: string,
    correctHashedPassword: string,
  ) {
    return this.hashModule.compare(payloadPassword, correctHashedPassword)
  }
}
