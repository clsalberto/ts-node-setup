export interface IControllerBase<Q = any, R = any> {
  handle(request: Q, response: R): Promise<R>
}
