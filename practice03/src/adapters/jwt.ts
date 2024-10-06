export abstract class JWTModule {
  abstract generateToken(id: string): string
  abstract getToken(token: string): string
}
