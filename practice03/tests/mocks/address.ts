import { some } from '@tests/utils/some'
import { IAddress } from '../../src/domain/bounded-contexts/pet-app/enterprise/value-objects/address'
import { IAddressGenerator } from '../../src/adapters/address/contract'

export class AddressGeneratorMock implements IAddressGenerator {
  async fromZipCode(zipCode: string): Promise<IAddress> {
    return {
      zipCode,
      IBGECode: some.text(),
      city: some.text(),
      state: some.text(),
      number: some.text(),
    }
  }
}
