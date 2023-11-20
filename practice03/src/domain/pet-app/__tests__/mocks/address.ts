import { IAddressGenerator } from '../../ports/address/contracts'

export class MockAddressGenerator implements IAddressGenerator {
  async fromZipCode(zipCode: string) {
    return {
      zipCode,
      ibgeCode: '2105302',
      city: 'Maranhão',
      state: 'MA',
      number: 'A20',
    }
  }
}
