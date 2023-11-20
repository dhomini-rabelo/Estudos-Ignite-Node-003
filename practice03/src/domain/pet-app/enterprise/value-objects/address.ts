export interface IAddress {
  zipCode: string
  ibgeCode: string
  city: string
  state: string
  number: string
}

export class Address {
  constructor(private value: IAddress) { }
}
