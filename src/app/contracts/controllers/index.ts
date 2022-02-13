export interface IControllerBase<E = any, S = any> {
  handle(request: E, response: S): Promise<S>
}
