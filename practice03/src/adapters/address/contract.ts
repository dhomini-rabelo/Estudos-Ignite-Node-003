import { IAddress } from '../../domain/bounded-contexts/pet-app/enterprise/value-objects/address'

export interface IAddressGenerator {
  fromZipCode: (zipCode: string) => Promise<IAddress>
}
