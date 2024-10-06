import { AddressGenerator } from '@/adapters/address'
import { HashModule } from '@/adapters/hash'
import { InstitutionRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/institution'
import {
  IInstitutionProps,
  Institution,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/institution'
import { Address } from '@/domain/bounded-contexts/pet-app/enterprise/value-objects/address'

import { IBaseUseCase } from '../../../../../core/use-cases/base'

interface IRequest extends Omit<IInstitutionProps, 'address'> {
  zipCode: string
}

export class CreateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: InstitutionRepository,
    private addressGenerator: AddressGenerator,
    private hash: HashModule,
  ) {}

  async execute(request: IRequest): Promise<Institution> {
    return this.institutionRepository.create({
      ...request,
      password: this.hash.generate(request.password),
      address: Address.create(
        await this.addressGenerator.fromZipCode(request.zipCode),
      ),
    })
  }
}
