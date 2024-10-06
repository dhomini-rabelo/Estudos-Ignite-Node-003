export interface IBaseUseCase {
  execute(payload: any): Promise<any>
}
