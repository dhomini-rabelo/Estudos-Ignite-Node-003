import { AddressGenerator } from '@/adapters/address'
import { AddressProps } from '@/domain/bounded-contexts/pet-app/enterprise/value-objects/address'
import { some } from '@tests/utils/some'

export class AddressGeneratorMock implements AddressGenerator {
  async fromZipCode(zipCode: string): Promise<AddressProps> {
    return {
      zipCode,
      IBGECode: some.text(),
      city: some.text(),
      state: some.text(),
      number: some.text(),
    }
  }
}
