import { IHash } from '../../ports/hash/contract'

export class HashMock implements IHash {
  generate(input: string): string {
    return input.concat('-')
  }

  compare(input: string, hash: string): boolean {
    return input === hash.replace('-', '')
  }
}
