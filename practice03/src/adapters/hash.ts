export interface IHash {
  generate(input: string): string
  compare(input: string, hash: string): boolean
}
