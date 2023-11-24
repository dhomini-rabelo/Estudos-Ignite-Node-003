export interface IRepository<Entity, Props> {
  create(props: Props): Promise<Entity>
  get(props: Partial<Props>): Promise<Entity>
  findUnique(props: Partial<Props>): Promise<Entity | null>
  findFirst(props: Partial<Props>): Promise<Entity | null>
  findMany(params: Partial<Props>): Promise<Entity[]>
  reset(): Promise<void>
}
