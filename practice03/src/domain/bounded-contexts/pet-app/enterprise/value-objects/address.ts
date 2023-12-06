export interface IAddress {
  zipCode: string
  IBGECode: string
  city: string
  stateAcronym: string
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

  get stateAcronym() {
    return this.value.stateAcronym
  }

  get number() {
    return this.value.number
  }

  private constructor(private value: IAddress) {
    Object.freeze(this)
  }

  static create(value: IAddress) {
    return new Address(value)
  }

  static reference(value: IAddress) {
    return new Address(value)
  }
}
