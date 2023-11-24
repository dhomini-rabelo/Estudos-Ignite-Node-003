import { IAddress } from '../../enterprise/value-objects/address'

export interface IAddressGenerator {
  fromZipCode: (zipCode: string) => Promise<IAddress>
}
