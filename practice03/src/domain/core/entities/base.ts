import { ID } from './id'

export abstract class IEntity<Props extends Record<string, any>> {
  private _id: ID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: ID) {
    this.props = props
    this._id = id ?? new ID()
  }

  public getProp(propName: string) {
    return this.props[propName]
  }

  public isEqual(entity: IEntity<object>) {
    return entity === this || entity.id === this._id
  }
}
