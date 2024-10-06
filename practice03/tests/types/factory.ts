export type Factory<Props, Entity> = {
  create: (data: Partial<Props>) => Promise<Entity>
}
