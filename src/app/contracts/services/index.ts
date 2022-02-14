export interface IServiceBase<E = any | undefined, S = any | void> {
  execute(data: E): Promise<S>
}
