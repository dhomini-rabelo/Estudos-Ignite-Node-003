import { some } from '@tests/utils/some'

import { Address, IAddress } from '../../enterprise/value-objects/address'

export function createAddressData({
  city = some.text(),
  IBGECode = some.text(),
  number = some.text(),
  stateAcronym = some.text(2),
  zipCode = some.text(),
}: Partial<IAddress> = {}) {
  return {
    city,
    IBGECode,
    number,
    stateAcronym,
    zipCode,
  }
}

export function createAddress(data: Partial<IAddress> = {}) {
  return Address.reference(createAddressData(data))
}
