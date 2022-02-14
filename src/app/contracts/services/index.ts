export interface IServiceBase<E = any, S = any | void> {
  execute(data: E): Promise<S>
}
