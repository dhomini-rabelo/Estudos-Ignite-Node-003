export interface IBaseUseCase {
  execute(...args: any[]): Promise<any>
}
