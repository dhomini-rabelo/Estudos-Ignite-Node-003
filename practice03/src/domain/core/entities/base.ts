import { EmptyRecord } from 'types/simple'

import { ID } from './id'

export abstract class IEntity<Props extends EmptyRecord = any> {
  private _id: ID
  public readonly props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: ID) {
    this.props = props
    this._id = id ?? new ID()
  }

  public getProp(propName: string) {
    return {
      ...this.props,
      id: this._id,
    }[propName]
  }

  public isEqual(entity: IEntity<object>) {
    return entity === this || entity.id === this._id
  }
}

export type EntityWithStatic<
  Entity extends typeof IEntity<any>,
  EntityProps extends EmptyRecord,
> = Entity & {
  create(props: EntityProps): Promise<IEntity>
  reference(id: ID, props: EntityProps): Promise<IEntity>
}
