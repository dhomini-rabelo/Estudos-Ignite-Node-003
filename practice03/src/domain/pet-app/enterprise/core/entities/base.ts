import { ID } from './id'

export abstract class IEntity<Props> {
  private _id: ID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: ID) {
    this.props = props
    this._id = id ?? new ID()
  }

  public equals(entity: IEntity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
