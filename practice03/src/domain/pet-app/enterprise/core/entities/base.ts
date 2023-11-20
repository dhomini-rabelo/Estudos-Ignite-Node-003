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

  public isEqual(entity: IEntity<unknown>) {
    return entity === this || entity.id === this._id
  }
}
