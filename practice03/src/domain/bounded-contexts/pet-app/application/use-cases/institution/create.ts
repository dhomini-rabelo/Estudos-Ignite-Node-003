import { IInstitutionRepository } from '@/domain/bounded-contexts/pet-app/application/repositories/institution'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import {
  IInstitutionProps,
  Institution,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/institution'
import { Address } from '@/domain/bounded-contexts/pet-app/enterprise/value-objects/address'
import { AddressGenerator } from '@/adapters/address'
import { HashModule } from '@/adapters/hash'

interface IRequest extends Omit<IInstitutionProps, 'address'> {
  zipCode: string
}

export class CreateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: IInstitutionRepository,
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
