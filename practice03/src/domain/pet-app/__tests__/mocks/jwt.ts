import { some } from '@tests/utils/some'
import { IJWT } from '../../ports/jwt/contract'

export class JWTMock extends IJWT {
  generateToken(id: string): string {
    return `${some.text(36)}.${some.text(74)}.${id}`
  }

  getToken(token: string): string {
    return String(token.split('.').at(-1))
  }
}
