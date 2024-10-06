import { AddressGenerator } from '@/adapters/address'
import { HashModule } from '@/adapters/hash'
import { InstitutionRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/institution'
import {
  InstitutionProps,
  Institution,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/institution'
import { Address } from '@/domain/bounded-contexts/pet-app/enterprise/value-objects/address'

import { IBaseUseCase } from '../../../../../core/use-cases/base'

interface Payload extends Omit<InstitutionProps, 'address'> {
  zipCode: string
}

export class CreateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: InstitutionRepository,
    private addressGenerator: AddressGenerator,
    private hash: HashModule,
  ) {}

  async execute(payload: Payload): Promise<Institution> {
    return this.institutionRepository.create({
      ...payload,
      password: this.hash.generate(payload.password),
      address: Address.create(
        await this.addressGenerator.fromZipCode(payload.zipCode),
      ),
    })
  }
}
