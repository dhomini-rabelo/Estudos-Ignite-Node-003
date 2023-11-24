import { some } from '@tests/utils/some'
import { IAddress } from '../../enterprise/value-objects/address'
import { IAddressGenerator } from '../../ports/address/contracts'

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
