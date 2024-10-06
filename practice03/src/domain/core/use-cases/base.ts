export interface IBaseUseCase {
  execute(payload: unknown): Promise<unknown>
}
