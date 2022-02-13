export interface IServiceBase<E = any, S = any> {
  execute(data: E): Promise<S>
}
