import { IHash } from '../../src/adapters/hash'

export class HashMock implements IHash {
  generate(input: string): string {
    return input.concat('///')
  }

  compare(input: string, hash: string): boolean {
    return this.generate(input) === hash
  }
}
