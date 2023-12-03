import { IInstitutionRepository } from '@/domain/bounded-contexts/pet-app/ports/database/repositories/institution'
import { IBaseUseCase } from '../../../../../core/use-cases/base'
import {
  IInstitutionProps,
  Institution,
} from '@/domain/bounded-contexts/pet-app/enterprise/entities/institution'
import { Address } from '@/domain/bounded-contexts/pet-app/enterprise/value-objects/address'
import { IAddressGenerator } from '@/adapters/address/contract'
import { IHash } from '@/adapters/hash/contract'

interface IRequest extends Omit<IInstitutionProps, 'address'> {
  zipCode: string
}

export class CreateInstitutionUseCase implements IBaseUseCase {
  constructor(
    private institutionRepository: IInstitutionRepository,
    private addressGenerator: IAddressGenerator,
    private hash: IHash,
  ) {}

  async execute(request: IRequest): Promise<Institution> {
    return this.institutionRepository.create({
      ...request,
      password: this.hash.generate(request.password),
      address: new Address(
        await this.addressGenerator.fromZipCode(request.zipCode),
      ),
    })
  }
}
