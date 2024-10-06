import { AddressProps } from '../domain/bounded-contexts/pet-app/enterprise/value-objects/address'

export interface AddressGenerator {
  fromZipCode: (zipCode: string) => Promise<AddressProps>
}
