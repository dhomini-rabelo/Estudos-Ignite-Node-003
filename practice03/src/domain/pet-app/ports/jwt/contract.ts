export abstract class IJWT {
  abstract generateToken(id: string): string
  abstract getToken(token: string): string
}
