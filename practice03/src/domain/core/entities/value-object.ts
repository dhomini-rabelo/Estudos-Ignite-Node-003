import { EmptyRecord } from 'types/simple'

export abstract class ValueObject<Props extends EmptyRecord = any> {
  public readonly props: Readonly<Props>

  protected constructor(props: Props) {
    this.props = props
    Object.freeze(this)
  }
}
