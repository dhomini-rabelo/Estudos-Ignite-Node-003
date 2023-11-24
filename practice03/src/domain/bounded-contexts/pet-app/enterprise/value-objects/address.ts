export interface IAddress {
  zipCode: string
  IBGECode: string
  city: string
  state: string
  number: string
}

export class Address {
  get IBGECode() {
    return this.value.IBGECode
  }

  get zipCode() {
    return this.value.zipCode
  }

  get city() {
    return this.value.city
  }

  get state() {
    return this.value.state
  }

  get number() {
    return this.value.number
  }

  constructor(private value: IAddress) {}
}
