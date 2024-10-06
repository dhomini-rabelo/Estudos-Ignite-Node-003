import { ValueObject } from '@/domain/core/entities/value-object'

export interface AddressProps {
  zipCode: string
  IBGECode: string
  city: string
  stateAcronym: string
  number: string
}

export class Address extends ValueObject<AddressProps> {
  static create(value: AddressProps) {
    return new Address(value)
  }

  static reference(value: AddressProps) {
    return new Address(value)
  }
}
